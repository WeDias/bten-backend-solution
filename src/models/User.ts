import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
	id: number;

  @Column('varchar', {
    name: 'home_team',
    nullable: true,
  })
  homeTeam: string;

  @Column('varchar')
  name: string;

  @Column('int')
  age: number;

  @Column('double precision')
  height: number;

  @Column('varchar', {
    nullable: false,
    unique: true,
  })
  username: string;

  @Column('varchar', {
    nullable: false,
  })
  password: string;

  @Column('timestamp', {
    name: 'created_at',
    default: 'NOW()',
  })
	createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
  })
	updatedAt: Date;
}