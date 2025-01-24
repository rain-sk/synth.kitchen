import React, { useEffect, useMemo, useState } from 'react';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import {
	SessionContextType,
	useSessionContext,
} from 'supertokens-auth-react/recipe/session';

import { AuthModal } from './modal';
import { SuperTokensConfig } from '.';
import { useAsyncFn } from 'react-use';
import { AuthService } from './service';
import { IAuthUser } from './types';

SuperTokens.init(SuperTokensConfig);

export type IAuthContext = {
	user?: IAuthUser;
	setOpenAuthModal: (openAuthModal: boolean) => void;
	session: SessionContextType;
};

export const AuthContext = React.createContext<IAuthContext>(
	undefined as any as IAuthContext,
);

const AuthContextProviderInner: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const session = useSessionContext();
	const [user, updateUser] = useAsyncFn<
		() => Promise<IAuthUser | undefined>
	>(async () => {
		return await AuthService.me();
	}, []);

	const [openAuthModal, setOpenAuthModal] = useState(false);

	useEffect(() => {
		if (session.loading) {
			return;
		}

		if (session.doesSessionExist && !user.loading && !user.value) {
			updateUser();
			return;
		}
	}, [session, user, updateUser, setOpenAuthModal]);

	const value = useMemo(
		() => ({
			user: user.value,
			setOpenAuthModal,
			session,
		}),
		[session, user, setOpenAuthModal],
	);

	return (
		<AuthContext.Provider value={value}>
			{children}
			<AuthModal open={openAuthModal} />
		</AuthContext.Provider>
	);
};

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => (
	<SuperTokensWrapper>
		<AuthContextProviderInner>{children}</AuthContextProviderInner>
	</SuperTokensWrapper>
);
