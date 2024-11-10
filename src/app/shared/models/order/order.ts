import { CreateOrderDTO } from '../../dtos/orders/create-order-dto/create-order.dto';
import { UpdateOrderDTO } from '../../dtos/orders/update-order-dto/update-order.dto';
import { User } from '../users/user';

export class Order {
  orderId: string = '';

  name: string = '';

  userId: string = '';

  user: User = new User();

  productId: string = '';

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(order?: { [key: string]: any }) {
    if (order) {
      this.orderId = order['orderId'] || order['_id'] || '';

      this.name = order['name'] || '';

      // this.userId = order['userId'] || '';

      this.productId = order['productId'] || '';

      if (typeof order['userId'] === 'object') {
        this.user = new User(order['userId']);
        this.userId = this.user.userId;
      } else {
        this.userId = order['userId'] || '';
      }

      if (typeof order['user'] === 'object') {
        this.user = new User(order['user']);
        this.userId = this.user.userId;
      }

      this.timestamp = order['timestamp'] || {
        createdAt: null,
        updatedAt: null,
      };
    }
  }

  toCreateDTO(): CreateOrderDTO {
    return {
      name: this.name,
      userId: this.userId,
      productId: this.productId,
    };
  }

  toUpdateDTO(): UpdateOrderDTO {
    return {
      orderId: this.orderId,
      name: this.name,
    };
  }
}
