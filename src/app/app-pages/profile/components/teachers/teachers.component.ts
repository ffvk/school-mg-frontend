import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { GetUsersDTO } from 'src/app/shared/dtos/users/get-users-dto/get-users.dto';
import { User } from 'src/app/shared/models/users/user';
import { UsersApiService } from 'src/app/shared/services/api/users-api.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  clientUsers: User[] = [];
  me: User = new User();

  query: GetUsersDTO = {
    limit: -1,
    page: 1,
    role: 'ROOT',
  };

  // organizationQuery: GetOrganizationsDTO = {
  //   limit: -1,
  //   page: 1,
  // };

  constructor(
    private userLocalService: UserLocalService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private readonly usersAPIService: UsersApiService,
    private toaster: ToasterService // private readonly organizationAPIService: OrganizationsApiService
  ) {}

  async ngOnInit() {
    this.me = this.userLocalService.getMe();
    if (!this.me?.userId) {
      localStorage.removeItem('amt-me');
      this.router.navigate(['/login']);
    }
    if (!this.me.email.verified) {
      this.router.navigateByUrl('/verify-email');
      return;
    }

    // this.query.parentOrganizationId = this.me.organizationId;

    await this.getUsers();
    // await this.getOrganizations();
  }

  async getUsers() {
    this.clientUsers = (
      await lastValueFrom(this.usersAPIService.getUsers(this.query))
    ).users;
  }

  // async clientUserModal(userData: User = new User({})) {
  //   const modal = await this.modalController.create({
  //     component: ClientUserFormComponent,
  //     cssClass: 'client-user-form-wrap',
  //     backdropDismiss: false,
  //     componentProps: {
  //       user: userData,
  //       organizations: this.clientOrganizations,
  //       me: this.me,
  //     },
  //   });

  //   await modal.present();

  //   let { data } = await modal.onDidDismiss();

  //   if (data) {
  //     this.getUsers();
  //   }
  // }

  async presentAlert(user: User) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'delete-wrap',
      buttons: [
        {
          text: 'Delete',
          role: 'confirm',
          cssClass: 'confirm',
          handler: () => {
            this.usersAPIService.deleteUser(user.userId).subscribe(() => {
              this.getUsers();

              this.toaster.success('User successfully deleted');
            });
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

  searchQuery(key: keyof GetUsersDTO, evt: Event) {
    this.query.page = 1;
    const { target } = evt;
    this.query[key] = encodeURIComponent((target as any).value) as never;
    if (Array.isArray(this.query[key])) {
      this.query[key] = (this.query[key] as any).join(',') as never;
    }
    this.getUsers();
  }

  // async getOrganizations() {
  //   let organizationQuery: GetOrganizationsDTO = {
  //     limit: -1,
  //     page: 1,
  //     organizationId: this.me.organizationId,
  //     type: 'OFFSET_PRINTER',
  //   };

  //   this.offsetOrganizations = (
  //     await lastValueFrom(
  //       this.organizationAPIService.getOrganizations(organizationQuery)
  //     )
  //   ).organizations;

  //   organizationQuery.type = 'CLIENT';
  //   delete organizationQuery.organizationId;
  //   organizationQuery.parentOrganizationId = this.me.organizationId;

  //   this.clientOrganizations = (
  //     await lastValueFrom(
  //       this.organizationAPIService.getOrganizations(organizationQuery)
  //     )
  //   ).organizations;
  // }
}
