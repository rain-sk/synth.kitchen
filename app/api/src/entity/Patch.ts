import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./User";
import { Patch as SharedPatch } from "synth.kitchen-shared";
import { Sample } from "./Sample";

@Entity()
export class Patch implements SharedPatch {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  slug: string;

  @Column({ type: "json" })
  data: string;

  @ManyToMany(() => Sample, (sample) => sample.patches, { eager: true })
  samples: Sample[];

  @Column({ type: "boolean", default: true })
  public: boolean;

  @ManyToOne(() => User, (user) => user.patches)
  creator: User;

  @OneToMany(() => Patch, (patch) => patch.forkedFrom)
  forks: Promise<Patch[]>;

  @ManyToOne(() => Patch, (patch) => patch.forks, { eager: true })
  forkedFrom: Patch;
}
