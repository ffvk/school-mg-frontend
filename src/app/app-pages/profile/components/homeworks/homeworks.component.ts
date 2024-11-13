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
import { Sclass } from 'src/app/shared/models/sclasses/sclass';
import { SclassesAPIService } from 'src/app/shared/services/api/sclasses.service';
import { GetSclassesDTO } from 'src/app/shared/dtos/sclasses/get-sclasses-dto/get-sclasses-dto';
import { GetSubjectsDTO } from 'src/app/shared/dtos/subjects/get-subjects-dto/get-subjects-dto';
import { Subject } from 'src/app/shared/models/subjects/subject';
import { SubjectsApiService } from 'src/app/shared/services/api/subjects.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.scss'],
})
export class HomeworksComponent implements OnInit {
  allHomeworks: Homework[] = [];
  me: User = new User();

  sclasses: Sclass[] = [];
  subjects: Subject[] = [];

  query: GetHomeworksDTO = {
    limit: -1,
    page: 1,
  };

  sclassQuery: GetSclassesDTO = {
    limit: -1,
    page: 1,
  };
  subjectsQuery: GetSubjectsDTO = {
    limit: -1,
    page: 1,
  };

  constructor(
    private readonly userLocalService: UserLocalService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private readonly homeworksAPIService: HomeworksApiService,
    private toaster: ToasterService,
    private readonly sclassesAPIService: SclassesAPIService,
    private readonly subjectsAPIService: SubjectsApiService
  ) {}

  async ngOnInit() {
    this.me = this.userLocalService.getMe();
    console.log('me', this.me.role);

    await this.getHomeworks(this.query);
    await this.getSclasses();
    await this.getSubjects();

    console.log('subjects', this.subjects);
  }

  async getHomeworks(query: GetHomeworksDTO) {
    this.allHomeworks = (
      await lastValueFrom(this.homeworksAPIService.getHomeworks(this.query))
    ).homeworks;
  }

  async getSclasses() {
    this.sclasses = (
      await lastValueFrom(this.sclassesAPIService.getSclasses(this.sclassQuery))
    ).sclasses;
  }

  async getSubjects() {
    this.subjects = (
      await lastValueFrom(this.subjectsAPIService.getSubjects(this.sclassQuery))
    ).subjects;
  }

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
        sclasses: this.sclasses,
        subjects: this.subjects,
      },
    });

    await modal.present();

    let { data } = await modal.onDidDismiss();

    if (data) {
      this.getHomeworks(this.query);
    }
  }
}
