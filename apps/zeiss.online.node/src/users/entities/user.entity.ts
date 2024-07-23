import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;
  @Column()
  @AutoMap()
  name: string;
  @Column()
  @AutoMap()
  phoneNumber: string;
  @Column()
  @AutoMap()
  password: string;
  @Column()
  @AutoMap()
  role: string;
}
