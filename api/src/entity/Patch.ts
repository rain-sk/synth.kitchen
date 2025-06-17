import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { PatchInfo } from "shared";

@Entity()
export class Patch implements PatchInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "json" })
  data: string;

  @Column({ type: "boolean", default: false })
  public: boolean;

  @ManyToOne(() => User, (user) => user.patches)
  chef: User;

  @OneToMany(() => Patch, (patch) => patch.forkedFrom)
  forks: Promise<Patch[]>;

  @ManyToOne(() => Patch, (patch) => patch.forks, { eager: true })
  forkedFrom: Patch;
}
