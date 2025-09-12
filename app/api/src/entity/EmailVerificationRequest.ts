import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class EmailVerificationRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (user) => user.emailVerificationRequest)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt!: Date;
}
