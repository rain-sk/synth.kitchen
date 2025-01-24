import { IAuthUser } from './types';

export class AuthService {
	static me = async () => {
		try {
			const response = await fetch('/api/me');
			const { user } = await response.json();
			return user as IAuthUser;
		} catch (e) {
			console.error(e);
		}
		return undefined;
	};
}
