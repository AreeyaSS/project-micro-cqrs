import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity()
export class OrderEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  @Index()
  customerId: number;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];
}
