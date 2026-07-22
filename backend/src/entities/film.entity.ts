import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column({ nullable: true })
  director: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
