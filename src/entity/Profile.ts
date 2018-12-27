import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @OneToOne(type => User, user => user.profile)
  user: User;
}