import { Order } from './order';

export class Orders {
  currentCount: number = 0;
  totalCount: number = 0;
  orders: Order[] = [];

  constructor(orders?: { [key: string]: any }) {
    if (orders) {
      if (!isNaN((orders['currentCount'] = parseInt(orders['currentCount'])))) {
        this.currentCount = orders['currentCount'];
      }

      if (!isNaN((orders['totalCount'] = parseInt(orders['totalCount'])))) {
        this.totalCount = orders['totalCount'];
      }

      if (orders['orders']?.length) {
        for (let i = 0; i < orders['orders'].length; i++) {
          this.orders.push(new Order(orders['orders'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.orders.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.orders.length;
        }
      }
    }
  }

  getById(orderId: string): Order | null {
    for (let order of this.orders) {
      if (order.orderId === orderId) {
        return order;
      }
    }

    return null;
  }

  add(order: Order) {
    this.orders.push(order);
    this.currentCount++;
    this.totalCount++;
  }
}
