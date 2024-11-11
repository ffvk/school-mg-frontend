import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/shared/models/users/user';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';
// import { PasswordFormComponent } from '../password-form/password-form.component';
// import { BasicFormComponent } from '../basic-form/basic-form.component';
import { GetUsersDTO } from 'src/app/shared/dtos/users/get-users-dto/get-users.dto';
import { lastValueFrom } from 'rxjs';
import { UsersApiService } from 'src/app/shared/services/api/users-api.service';
// import { UploadPhotoComponent } from '../upload-photo/upload-photo.component';
import {
  UserGenderEnum,
  UserRoleEnum,
} from 'src/app/shared/settings/app-settings';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  // me: User = null;
  me: User = new User();

  UserGender = UserGenderEnum;
  UserRole = UserRoleEnum;

  constructor(
    private userLocalService: UserLocalService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private usersAPIService: UsersApiService
  ) {}

  async ngOnInit() {
    this.me = this.userLocalService.getMe();
    await this.getCurrentUser();
    console.log(this.me);
  }

  async signOutModal() {
    const alert = await this.alertController.create({
      header: `Are you sure?`,
      cssClass: 'sign-out-wrap',
      buttons: [
        {
          text: 'Sign Out',
          role: 'confirm',
          cssClass: 'confirm',
          handler: () => {
            this.userLocalService.removeMe();

            this.router.navigateByUrl('/login');
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

  // async editModal() {
  //   const modal = await this.modalController.create({
  //     component: BasicFormComponent,
  //     cssClass: 'basic-form-wrap',
  //     backdropDismiss: false,
  //     componentProps: {
  //       user: this.me,
  //     },
  //   });

  //   await modal.present();

  //   let { data } = await modal.onDidDismiss();

  //   if (data) {
  //     this.getCurrentUser();
  //   }
  // }

  // async passwordChangeModal() {
  //   const modal = await this.modalController.create({
  //     component: PasswordFormComponent,
  //     cssClass: 'password-form-wrap',
  //     backdropDismiss: false,
  //     componentProps: {
  //       user: this.me,
  //     },
  //   });

  //   await modal.present();

  //   let { data } = await modal.onDidDismiss();
  // }

  async getCurrentUser() {
    const userQuery: GetUsersDTO = {
      limit: 1,
      page: 1,
      userId: this.me.userId,
    };

    const users = await lastValueFrom(this.usersAPIService.getUsers(userQuery));

    if (users?.users) {
      this.me = users.users[0];
      this.userLocalService.saveMe(this.me);
    }
  }

  // async uploadPhotoChangeModal() {
  //   const modal = await this.modalController.create({
  //     component: UploadPhotoComponent,
  //     cssClass: 'upload-photo-form-wrap',
  //     backdropDismiss: false,
  //     componentProps: {
  //       user: this.me,
  //     },
  //   });

  //   await modal.present();

  //   let { data } = await modal.onDidDismiss();

  //   if (data) {
  //     this.getCurrentUser();
  //   }
  // }
}
