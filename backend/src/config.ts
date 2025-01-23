import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';

export const appInfo = {
  // Learn more about this on https://supertokens.com/docs/thirdpartypasswordless/appInfo
  appName: 'ST',
  apiDomain: 'http://localhost:3001',
  websiteDomain: 'http://localhost:3000',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};

export const connectionUri = 'https://st-dev-64175bc0-d99d-11ef-8c4b-53905c1f8f99.aws.supertokens.io';

export const recipeList = [
  EmailPassword.init(),
  Session.init(),
  Dashboard.init(),
  UserRoles.init(),
];
