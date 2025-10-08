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
import {
  PatchState,
  SavedPatchState as SharedSavedPatchState,
  PATCH_STATE_VERSIONS,
} from "synth.kitchen-shared";

import { Patch } from "./Patch";

@Entity()
export class SavedPatchState implements SharedSavedPatchState {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "json", nullable: true })
  state: PatchState;

  @ManyToOne(
    () => SavedPatchState,
    (savedPatchState) => savedPatchState.descendants
  )
  @JoinColumn()
  ancestor: SavedPatchState;

  @OneToMany(
    () => SavedPatchState,
    (savedPatchState) => savedPatchState.ancestor
  )
  @JoinColumn()
  descendants: SavedPatchState[];

  @ManyToOne(() => Patch, (patch) => patch.states)
  @JoinColumn()
  patch: Patch;
}
