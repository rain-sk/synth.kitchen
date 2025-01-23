import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export function getApiDomain() {
	const apiPort = import.meta.env.VITE_APP_API_PORT || 3001;
	const apiUrl =
		import.meta.env.VITE_APP_API_URL || `http://localhost:${apiPort}`;
	return apiUrl;
}

export function getWebsiteDomain() {
	const websitePort = import.meta.env.VITE_APP_WEBSITE_PORT || 3000;
	const websiteUrl =
		import.meta.env.VITE_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
	return websiteUrl;
}

export const SuperTokensConfig = {
	appInfo: {
		appName: 'SuperTokens Demo App',
		apiDomain: getApiDomain(),
		websiteDomain: getWebsiteDomain(),
	},
	// recipeList contains all the modules that you want to
	// use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
	recipeList: [EmailPassword.init(), Session.init()],
	getRedirectionURL: async (context: any) => {
		if (context.action === 'SUCCESS' && context.newSessionCreated) {
			return '/dashboard';
		}
	},
};
