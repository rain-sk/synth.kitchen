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
  ModuleGroup as SharedModuleGroup,
  MODULE_GROUP_STATE_VERSIONS,
} from "synth.kitchen-shared";

import { CustomModule } from "./CustomModule";

@Entity()
export class SavedCustomModuleState {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "json", nullable: true })
  state: SharedModuleGroup;

  @ManyToOne(
    () => SavedCustomModuleState,
    (savedCustomModuleState) => savedCustomModuleState.descendants
  )
  @JoinColumn()
  ancestor: SavedCustomModuleState;

  @OneToMany(
    () => SavedCustomModuleState,
    (savedCustomModuleState) => savedCustomModuleState.ancestor
  )
  @JoinColumn()
  descendants: SavedCustomModuleState[];

  @ManyToOne(() => CustomModule, (customModule) => customModule.states)
  @JoinColumn()
  customModule: CustomModule;
}
