import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetOrdersDTO } from '../../dtos/orders/get-orders-dto/get-orders.dto';
import { Observable, map } from 'rxjs';
import { Orders } from '../../models/order/orders';
import { RouteSettings } from '../../settings/route-settings';
import { CreateOrderDTO } from '../../dtos/orders/create-order-dto/create-order.dto';
import { Order } from '../../models/order/order';
import { UpdateOrderDTO } from '../../dtos/orders/update-order-dto/update-order.dto';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getOrders(query?: GetOrdersDTO): Observable<Orders> {
    let httpParams = new HttpParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        httpParams = httpParams.append(key, value);
      });
    }

    let getOrdersURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.ORDERS.GET;

    return this.httpClient.get(getOrdersURL, { params: httpParams }).pipe(
      map(
        (response: { [key: string]: any }) =>
          new Orders(
            response['data'] || {
              totalCount: 0,
              currentCount: 0,
              orders: [],
            }
          )
      )
    );
  }

  createOrder(createOrderDTO: CreateOrderDTO): Observable<Order> {
    let createOrderURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.ORDERS.CREATE;

    return this.httpClient
      .post(createOrderURL, createOrderDTO)
      .pipe(
        map((response: { [key: string]: any }) => new Order(response['data']))
      );
  }

  updateOrder(updateOrderDTO: UpdateOrderDTO): Observable<Order> {
    let updateOrderURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.ORDERS.UPDATE;

    return this.httpClient
      .put(updateOrderURL, updateOrderDTO)
      .pipe(
        map((response: { [key: string]: any }) => new Order(response['data']))
      );
  }

  deleteOrder(orderId: string): Observable<null> {
    let deleteOrderUrl: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.ORDERS.DELETE;

    return this.httpClient
      .request('delete', deleteOrderUrl, {
        body: { orderId },
      })
      .pipe(map((response) => null));
  }
}
