import { Product } from './product';

export class Products {
  currentCount: number = 0;
  totalCount: number = 0;
  products: Product[] = [];

  constructor(products?: { [key: string]: any }) {
    if (products) {
      if (
        !isNaN((products['currentCount'] = parseInt(products['currentCount'])))
      ) {
        this.currentCount = products['currentCount'];
      }

      if (!isNaN((products['totalCount'] = parseInt(products['totalCount'])))) {
        this.totalCount = products['totalCount'];
      }

      if (products['products']?.length) {
        for (let i = 0; i < products['products'].length; i++) {
          this.products.push(new Product(products['products'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.products.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.products.length;
        }
      }
    }
  }

  getById(productId: string): Product | null {
    for (let product of this.products) {
      if (product.productId === productId) {
        return product;
      }
    }

    return null;
  }

  add(product: Product) {
    this.products.push(product);
    this.currentCount++;
    this.totalCount++;
  }
}
