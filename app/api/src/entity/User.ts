import { IsEmail } from "class-validator";
import {
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { UserInfoAuthenticated } from "synth.kitchen-shared";

import { Patch } from "./Patch";
import { EmailVerificationRequest } from "./EmailVerificationRequest";

@Entity()
export class User implements UserInfoAuthenticated {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text", unique: true })
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

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @OneToMany(() => Patch, (patch) => patch.creator)
  patches: Promise<Patch[]>;
}
