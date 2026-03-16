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
import { SavedCustomModuleState } from "./SavedCustomModuleState";

@Entity()
export class CustomModule {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToOne(() => SavedCustomModuleState, (savedCustomModuleState) => savedCustomModuleState.customModule, { eager: true })
  @JoinColumn()
  state: SavedCustomModuleState;

  @OneToMany(() => SavedCustomModuleState, (savedCustomModuleState) => savedCustomModuleState.customModule)
  states: Promise<SavedCustomModuleState[]>;

  @Column({ type: "boolean", default: true })
  public: boolean;

  @ManyToOne(() => User, (user) => user.customModules)
  @JoinColumn()
  creator: User;

  @OneToMany(() => CustomModule, (customModule) => customModule.forkedFrom)
  forks: Promise<CustomModule[]>;

  @ManyToOne(() => CustomModule, (customModule) => customModule.forks, { eager: true })
  forkedFrom: CustomModule;
}
