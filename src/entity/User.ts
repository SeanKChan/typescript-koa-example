import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Profile } from "./Profile";
import { Photo } from "./Photo";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @OneToOne(type => Profile, profile => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

}