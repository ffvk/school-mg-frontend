import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { GetHomeworksDTO } from 'src/app/shared/dtos/homeworks/get-homeworks-dto/get-homeworks-dto';
import { Homework } from 'src/app/shared/models/homeworks/homework';
import { HomeworksApiService } from 'src/app/shared/services/api/homeworks.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';
import { UploadHomeworkComponent } from '../upload-homework/upload-homework.component';
import { HomeworkFormComponent } from '../homework-form/homework-form.component';
import { User } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.scss'],
})
export class HomeworksComponent implements OnInit {
  allHomeworks: Homework[] = [];
  me: User = new User();

  query: GetHomeworksDTO = {
    limit: -1,
    page: 1,
  };

  // organizationQuery: GetOrganizationsDTO = {
  //   limit: -1,
  //   page: 1,
  // };

  constructor(
    private readonly userLocalService: UserLocalService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private readonly homeworksAPIService: HomeworksApiService,
    private toaster: ToasterService // private readonly organizationAPIService: OrganizationsApiService
  ) {}

  async ngOnInit() {
    // this.query.parentOrganizationId = this.me.organizationId;

    await this.getHomeworks(this.query);
    // await this.getOrganizations();
  }

  async getHomeworks(query: GetHomeworksDTO) {
    this.allHomeworks = (
      await lastValueFrom(this.homeworksAPIService.getHomeworks(this.query))
    ).homeworks;
  }

  // async clientHomeworkModal(homeworkData: Homework = new Homework({})) {
  //   const modal = await this.modalController.create({
  //     component: ClientHomeworkFormComponent,
  //     cssClass: 'client-homework-form-wrap',
  //     backdropDismiss: false,
  //     componentProps: {
  //       homework: homeworkData,
  //       organizations: this.clientOrganizations,
  //       me: this.me,
  //     },
  //   });

  //   await modal.present();

  //   let { data } = await modal.onDidDismiss();

  //   if (data) {
  //     this.getHomeworks();
  //   }
  // }

  async presentAlert(homework: Homework) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'delete-wrap',
      buttons: [
        {
          text: 'Delete',
          role: 'confirm',
          cssClass: 'confirm',
          handler: () => {
            this.homeworksAPIService
              .deleteHomework(homework.homeworkId)
              .subscribe(() => {
                this.getHomeworks(this.query);

                this.toaster.success('Homework successfully deleted');
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

  searchQuery(key: keyof GetHomeworksDTO, evt: Event) {
    this.query.page = 1;
    const { target } = evt;
    this.query[key] = encodeURIComponent((target as any).value) as never;
    if (Array.isArray(this.query[key])) {
      this.query[key] = (this.query[key] as any).join(',') as never;
    }
    this.getHomeworks(this.query);
  }

  async uploadHomeworkModal(homework: Homework = new Homework()) {
    const modal = await this.modalController.create({
      component: UploadHomeworkComponent,
      cssClass: 'upload-photo-form-wrap',
      backdropDismiss: false,
      componentProps: {
        homework: homework,
      },
    });

    await modal.present();

    let { data } = await modal.onDidDismiss();

    if (data) {
      this.getHomeworks(this.query);
    }
  }

  async presentModal(evt: Event, homework: Homework = new Homework({})) {
    if (evt) {
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      evt.preventDefault();
    }

    const modal = await this.modalController.create({
      component: HomeworkFormComponent,
      cssClass: 'homework-form-wrap',
      backdropDismiss: false,
      componentProps: {
        homework: homework,
      },
    });

    await modal.present();

    let { data } = await modal.onDidDismiss();

    if (data) {
      this.getHomeworks(this.query);
    }
  }
}
