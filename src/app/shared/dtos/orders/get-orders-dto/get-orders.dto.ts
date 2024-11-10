export class GetOrdersDTO {
  orderId?: string = '';

  orderIds?: string = '';

  name?: string = '';

  userId?: string = '';

  productId?: string = '';

  limit?: number;

  page?: number;

  fields?: string;

  sort?: string;

  search?: string;

  populate?: string;
}
