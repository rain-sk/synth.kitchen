import { RecipeInfo } from "./recipe";

export type UserProfile = {
  id: string;
  username: string;
  recipes: Promise<RecipeInfo[]>;
};

export type AuthenticatedUserInfo = UserProfile & {
  verified: boolean;
  email: string;
};

export type AdminUser = AuthenticatedUserInfo & {
  admin: true;
};
