import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from '../../families/entities/families.entity';
import { Person } from '../../person/entities/person.entity';

@Entity()
export class FamilyToPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', nullable: true })
  activatedAt: Date;

  @ManyToOne(() => Family, (family) => family.Persons)
  family: Family;

  @ManyToOne(() => Person, (person) => person.families)
  person: Person;
}
