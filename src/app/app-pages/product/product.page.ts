import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { CreateOrderDTO } from 'src/app/shared/dtos/orders/create-order-dto/create-order.dto';
import { GetProductsDTO } from 'src/app/shared/dtos/products/get-products-dto/get-products.dto';
import { Product } from 'src/app/shared/models/products/product';
import { Products } from 'src/app/shared/models/products/products';
import { User } from 'src/app/shared/models/users/user';
import { OrdersApiService } from 'src/app/shared/services/api/orders-api.service';
import { ProductsApiService } from 'src/app/shared/services/api/products-api.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  products: Products = new Products();
  product: Product = new Product();

  me: User = new User();

  query: GetProductsDTO = {
    limit: -1,
    page: 1,
  };

  constructor(
    public readonly toaster: ToasterService,
    private readonly productsAPIService: ProductsApiService,
    private alertController: AlertController,
    private readonly modalController: ModalController,
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

    await this.getProducts(this.query);
  }

  async getProducts(query: GetProductsDTO) {
    this.products = await lastValueFrom(
      this.productsAPIService.getProducts(query)
    );
  }

  async orderModal(product: Product) {
    this.product = product; // Set the selected product

    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'sign-out-wrap',
      buttons: [
        {
          text: 'Confirm',
          role: 'confirm',
          cssClass: 'confirm',
          handler: () => {
            this.placeOrder();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  placeOrder() {
    if (!this.product.name || !this.product.productId) {
      this.toaster.error(
        'Please select a valid product before placing an order.'
      );
      return;
    }

    const orderDetails: CreateOrderDTO = {
      name: this.product.name,
      userId: this.me.userId,
      productId: this.product.productId,
    };

    this.ordersApiService.createOrder(orderDetails).subscribe({
      next: (order) => {
        console.log('Order placed successfully', order);
        this.toaster.success('Order Success');
      },
      error: (error) => {
        console.error('Error placing order', error);
        this.toaster.error('Failed to place order. Please try again.');
      },
    });
  }
}
