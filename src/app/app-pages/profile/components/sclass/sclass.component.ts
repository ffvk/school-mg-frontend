import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { GetSclassesDTO } from 'src/app/shared/dtos/sclasses/get-sclasses-dto/get-sclasses-dto';
import { GetUsersDTO } from 'src/app/shared/dtos/users/get-users-dto/get-users.dto';
import { Sclass } from 'src/app/shared/models/sclasses/sclass';
import { User } from 'src/app/shared/models/users/user';
import { SclassesAPIService } from 'src/app/shared/services/api/sclasses.service';
import { UsersApiService } from 'src/app/shared/services/api/users-api.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-sclass',
  templateUrl: './sclass.component.html',
  styleUrls: ['./sclass.component.scss'],
})
export class SclassComponent implements OnInit {
  clientUsers: User[] = [];
  sclasses: Sclass[] = [];
  me: User = new User();

  query: GetUsersDTO = {
    limit: -1,
    page: 1,
    role: 'STUDENT',
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
    private readonly sclassesAPIService: SclassesAPIService,

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
    await this.getSclasses(this.query);
  }

  async getSclasses(query: GetSclassesDTO) {
    this.sclasses = (
      await lastValueFrom(this.sclassesAPIService.getSclasses(this.query))
    ).sclasses;
  }

  async getUsers() {
    this.clientUsers = (
      await lastValueFrom(this.usersAPIService.getUsers(this.query))
    ).users;
  }

  async presentAlert(sclass: Sclass) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'delete-wrap',
      buttons: [
        {
          text: 'Delete',
          role: 'confirm',
          cssClass: 'confirm',
          handler: () => {
            this.sclassesAPIService
              .deleteSclass(sclass.sclassId)
              .subscribe(() => {
                this.getSclasses(this.query);

                this.toaster.success('Sclass successfully deleted');
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
}
