import { User } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

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
