import { RecipeInfo } from "./recipe";

export type UserInfo = {
  id: string;
  username: string;
};

export type UserRecipes = UserInfo & {
  recipes: RecipeInfo[];
};

export type UserInfoAuthenticated = UserInfo & {
  verified: boolean;
  email: string;
};

export type AdminUser = UserInfoAuthenticated & {
  admin: true;
};
