import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export const SuperTokensConfig = {
	appInfo: {
		appName: 'synth.kitchen',
		apiDomain: `https://${process.env.DOMAIN}/api`,
		websiteDomain: `https://${process.env.DOMAIN}`,
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
