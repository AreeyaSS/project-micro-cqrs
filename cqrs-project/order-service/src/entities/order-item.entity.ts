import { Column, Entity, Index, ManyToOne, ObjectIdColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
@Entity()
export class OrderItemEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  @Index()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
