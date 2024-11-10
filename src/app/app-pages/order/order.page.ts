import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GetOrdersDTO } from 'src/app/shared/dtos/orders/get-orders-dto/get-orders.dto';
import { Orders } from 'src/app/shared/models/order/orders';
import { User } from 'src/app/shared/models/users/user';
import { OrdersApiService } from 'src/app/shared/services/api/orders-api.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orders: Orders = new Orders();
  me: User = new User();

  query: GetOrdersDTO = {
    limit: -1,
    page: 1,
  };

  constructor(
    private readonly userLocalService: UserLocalService,
    private readonly router: Router,
    private ordersApiService: OrdersApiService
  ) {}

  async ngOnInit() {
    this.me = this.userLocalService.getMe();

    if (!this.me?.email?.verified) {
      this.router.navigate(['/verify-email']);
      return;
    }

    if (this.me.role === 'ADMIN') {
      await this.fetchOrders(this.query);
    } else if (this.me.role === 'CUSTOMER') {
      this.query.userId = this.me.userId;
      await this.fetchOrders(this.query);
    }
  }

  async fetchOrders(query: GetOrdersDTO) {
    try {
      this.orders = await lastValueFrom(this.ordersApiService.getOrders(query));
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }
}
