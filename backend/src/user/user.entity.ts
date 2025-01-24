import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: 'uuid';

  @Column({ length: 500 })
  email: string;

  @Column('text')
  about: string;
}
