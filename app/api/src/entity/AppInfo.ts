import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

type APP_INFO_KEYS = "version";

@Entity()
export class AppInfo {
  @PrimaryColumn("varchar")
  key!: APP_INFO_KEYS;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @Column("varchar")
  data: string;
}
