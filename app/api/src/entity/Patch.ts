import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { PatchInfo } from "synth.kitchen-shared";
import { Sample } from "./Sample";
import { SavedPatchState } from "./SavedPatchState";
import { AppDataSource } from "../data-source";

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

  @OneToOne(() => SavedPatchState, (savedPatchState) => savedPatchState.patch)
  @JoinColumn()
  state: SavedPatchState;

  @OneToMany(() => SavedPatchState, (savedPatchState) => savedPatchState.patch)
  states: Promise<SavedPatchState[]>;

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
}
