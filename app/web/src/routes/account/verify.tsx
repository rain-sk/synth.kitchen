import { useContext, useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { navigate } from 'wouter/use-browser-location';

import { AuthContext } from '../../api/auth/context';
import { Loader } from '../../lib/shared/components/loader';

let verifying = false;
export const VerifyRoute: React.FC = () => {
	const [match, params] = useRoute('/account/verify/:key');
	const { verifyAccount } = useContext(AuthContext);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (match && params.key) {
			(async () => {
				if (verifying) {
					return;
				}
				verifying = true;
				const res = await verifyAccount(params.key);
				if (res.status === 200) {
					navigate('/account');
				} else {
					setLoading(false);
				}
			})();
		}
	}, []);

	return loading ? <Loader /> : <p>Something went wrong...</p>;
};
