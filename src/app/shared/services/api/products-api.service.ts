import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../../models/products/products';
import { Observable, map } from 'rxjs';
import { GetProductsDTO } from '../../dtos/products/get-products-dto/get-products.dto';
import { RouteSettings } from '../../settings/route-settings';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getProducts(query?: GetProductsDTO): Observable<Products> {
    let httpParams = new HttpParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        httpParams = httpParams.append(key, value);
      });
    }

    let getProductsURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.PRODUCTS.GET;

    return this.httpClient.get(getProductsURL, { params: httpParams }).pipe(
      map(
        (response: { [key: string]: any }) =>
          new Products(
            response['data'] || {
              totalCount: 0,
              currentCount: 0,
              Products: [],
            }
          )
      )
    );
  }
}
