import { IsEmail } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Recipe } from "./Recipe";
import { PasswordResetRequest } from "./PasswordResetRequest";
import { EmailVerificationRequest } from "./EmailVerificationRequest";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  username: string;

  @Column({ type: "text" })
  password: string;

  @Column({
    type: "boolean",
    default: false,
  })
  admin: boolean;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  @OneToMany(() => Recipe, (recipe) => recipe.chef)
  recipes: Promise<Recipe[]>;

  @OneToOne(() => EmailVerificationRequest, (request) => request.user)
  @Column({ type: "uuid", default: null })
  emailVerificationRequest: EmailVerificationRequest;
}
