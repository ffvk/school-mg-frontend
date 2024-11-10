import { Injectable, NgZone } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(
    private toaster: ToastController,
    private readonly zone: NgZone
  ) {}

  default(message: string, isHandset: boolean = false) {
    this.show(
      message,
      {
        duration: 2000,
        cssClass: ['notification', 'default'],
        color: 'light',
      },
      isHandset
    );
  }

  info(message: string, isHandset: boolean = false) {
    this.show(
      message,
      {
        duration: 2000,
        cssClass: ['notification', 'info'],
        color: 'secondary',
      },
      isHandset
    );
  }

  success(message: string, isHandset: boolean = false) {
    this.show(
      message,
      {
        duration: 2000,
        cssClass: ['notification', 'success'],
        color: 'success',
      },
      isHandset
    );
  }

  warn(message: string, isHandset: boolean = false) {
    this.show(
      message,
      {
        duration: 2500,
        cssClass: ['notification', 'warn'],
        color: 'warning',
      },
      isHandset
    );
  }

  error(message: string, isHandset: boolean = false) {
    this.show(
      message,
      {
        duration: 3000,
        cssClass: ['notification', 'error'],
        color: 'danger',
      },
      isHandset
    );
  }

  private show(
    message: string,
    configuration: ToastOptions,
    isHandset: boolean = false
  ) {
    // If desktop, move it to top-right
    if (!isHandset) {
      configuration.position = 'top';
    } else {
      configuration.position = 'bottom';
    }

    configuration.animated = true;
    configuration.message = message;

    // Need to open snackBar from Angular zone to prevent issues with its position per
    this.zone.run(async () => {
      const toast = await this.toaster.create(configuration);

      toast.present();
    });
  }
}
