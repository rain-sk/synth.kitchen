import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Sample as SharedSample } from "synth.kitchen-shared";
import { Patch } from "./Patch";

@Entity()
export class Sample implements SharedSample {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "bytea" })
  data: Buffer;

  @ManyToMany(() => Patch, (patch) => patch.samples)
  patches: Promise<Patch[]>;
}
