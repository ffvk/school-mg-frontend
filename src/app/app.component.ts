import { Component, HostListener } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly modalController: ModalController,
    private readonly popoverController: PopoverController
  ) {}

  @HostListener('window:popstate', ['$event'])
  async handlePopstateEvent() {
    try {
      // Try to get and dismiss modal if it exists.
      const modal = await this.modalController.getTop();
      if (modal) {
        await this.modalController.dismiss();
      }

      // Try to get and dismiss popover if it exists.
      const popover = await this.popoverController.getTop();
      if (popover) {
        await this.popoverController.dismiss();
      }
    } catch (error) {
      console.error('Error handling popstate:', error);
    }
  }
}
