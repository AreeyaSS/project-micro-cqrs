import { Entity, Column, PrimaryColumn, ObjectIdColumn } from 'typeorm';
@Entity('customer')
export class CustomerEntity {
  @PrimaryColumn()
  @ObjectIdColumn()
  id: string;

  @Column()
  fullName: string;

  @Column({ default: 0 })
  balance: number;
}
