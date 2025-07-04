import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { RecipeInfo } from "shared";

@Entity()
export class Recipe implements RecipeInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "json" })
  data: string;

  @Column({ type: "boolean", default: false })
  public: boolean;

  @ManyToOne(() => User, (user) => user.recipes)
  chef: User;

  @OneToMany(() => Recipe, (recipe) => recipe.forkedFrom)
  forks: Promise<Recipe[]>;

  @ManyToOne(() => Recipe, (recipe) => recipe.forks, { eager: true })
  forkedFrom: Recipe;
}
