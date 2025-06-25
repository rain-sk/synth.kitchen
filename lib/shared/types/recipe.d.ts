import { UserInfo } from "./user";

export type RecipeInfo = {
  id: string;
  name: string;
  chef: UserInfo;
};

export type Recipe = RecipeInfo & {
  data: string;
};
