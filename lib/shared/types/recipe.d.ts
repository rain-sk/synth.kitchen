import { UserProfile } from "./user";

export type RecipeInfo = {
  id: string;
  name: string;
  chef: UserProfile;
  data: string;
};
