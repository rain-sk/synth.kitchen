import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { PatchInfo } from "synth.kitchen-shared";

@Entity()
export class Patch implements PatchInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  slug: string;

  @Column({ type: "json" })
  data: string;

  @Column({ type: "boolean", default: true })
  public: boolean;

  @ManyToOne(() => User, (user) => user.patches)
  creator: User;

  @OneToMany(() => Patch, (patch) => patch.forkedFrom)
  forks: Promise<Patch[]>;

  @ManyToOne(() => Patch, (patch) => patch.forks, { eager: true })
  forkedFrom: Patch;
}
