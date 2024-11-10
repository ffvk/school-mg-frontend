import { CreateProductDTO } from '../../dtos/products/create-product-dto/create-product.dto';
import { UpdateProductDTO } from '../../dtos/products/update-product-dto/update-product.dto';

export class Product {
  productId: string = '';

  name: string = '';

  description?: string = '';

  price: number = 0;

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(product?: { [key: string]: any }) {
    if (product) {
      this.productId = product['productId'] || product['_id'] || '';

      this.name = product['name'] || '';

      this.description = product['description'] || '';

      if (!isNaN((product['price'] = parseInt(product['price'])))) {
        this.price = product['price'];
      }

      this.timestamp = product['timestamp'] || {
        createdAt: null,
        updatedAt: null,
      };
    }
  }

  toCreateDTO(): CreateProductDTO {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
    };
  }

  toUpdateDTO(): UpdateProductDTO {
    return {
      productId: this.productId,
      name: this.name,
      description: this.description,
      price: this.price,
    };
  }
}
