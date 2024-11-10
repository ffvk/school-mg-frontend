export class GetProductsDTO {
  productId?: string = '';

  productIds?: string = '';

  name?: string;

  description?: string;

  price?: number;

  limit?: number;

  page?: number;

  fields?: string;

  sort?: string;

  search?: string;

  populate?: string;
}
