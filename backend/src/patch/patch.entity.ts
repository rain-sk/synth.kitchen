import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { User } from '../users/entities/user.entity';

@Entity()
export class Patch {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  serializedPatch: string;

  @ManyToOne((_) => User)
  @JoinColumn([{ name: 'creator_id', referencedColumnName: 'id' }])
  creator: User;

  @Column('boolean')
  public: boolean;
}
