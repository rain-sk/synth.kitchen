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
import { Sample } from "./Sample";
import { Patch } from "./Patch";

@Entity()
export class SavedPatchState {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "json", nullable: true })
  state: string;

  @ManyToOne(
    () => SavedPatchState,
    (savedPatchState) => savedPatchState.descendants
  )
  ancestor: Promise<SavedPatchState>;

  @OneToMany(
    () => SavedPatchState,
    (savedPatchState) => savedPatchState.ancestor
  )
  descendants: Promise<SavedPatchState[]>;

  @ManyToOne(() => Patch, (patch) => patch.states)
  @JoinColumn()
  patch: Patch;

  @Column({ type: "boolean", default: true })
  needsUpgrade: boolean;
}
