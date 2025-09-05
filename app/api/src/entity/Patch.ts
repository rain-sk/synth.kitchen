import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { PatchInfo } from "synth.kitchen-shared";
import { Sample } from "./Sample";

@Entity()
export class Patch implements PatchInfo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  slug: string;

  @Column({ type: "json", nullable: true })
  state: string;

  @ManyToMany(() => Sample, (sample) => sample.patches, { eager: true })
  samples: Sample[];

  @Column({ type: "boolean", default: true })
  public: boolean;

  @ManyToOne(() => User, (user) => user.patches)
  @JoinColumn()
  creator: User;

  @OneToMany(() => Patch, (patch) => patch.forkedFrom)
  forks: Promise<Patch[]>;

  @ManyToOne(() => Patch, (patch) => patch.forks, { eager: true })
  forkedFrom: Patch;

  @Column({ type: "boolean", default: true })
  needsUpgrade: boolean;
}
