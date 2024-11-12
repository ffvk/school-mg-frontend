import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { GetSubjectsDTO } from 'src/app/shared/dtos/subjects/get-subjects-dto/get-subjects-dto';
import { Subject } from 'src/app/shared/models/subjects/subject';
import { SubjectsApiService } from 'src/app/shared/services/api/subjects.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  allSubjects: Subject[] = [];

  query: GetSubjectsDTO = {
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
    private readonly subjectsAPIService: SubjectsApiService,
    private toaster: ToasterService // private readonly organizationAPIService: OrganizationsApiService
  ) {}

  async ngOnInit() {
    // this.query.parentOrganizationId = this.me.organizationId;

    await this.getSubjects();
    // await this.getOrganizations();
  }

  async getSubjects() {
    this.allSubjects = (
      await lastValueFrom(this.subjectsAPIService.getSubjects(this.query))
    ).subjects;
  }

  // async clientSubjectModal(subjectData: Subject = new Subject({})) {
  //   const modal = await this.modalController.create({
  //     component: ClientSubjectFormComponent,
  //     cssClass: 'client-subject-form-wrap',
  //     backdropDismiss: false,
  //     componentProps: {
  //       subject: subjectData,
  //       organizations: this.clientOrganizations,
  //       me: this.me,
  //     },
  //   });

  //   await modal.present();

  //   let { data } = await modal.onDidDismiss();

  //   if (data) {
  //     this.getSubjects();
  //   }
  // }

  async presentAlert(subject: Subject) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'delete-wrap',
      buttons: [
        {
          text: 'Delete',
          role: 'confirm',
          cssClass: 'confirm',
          handler: () => {
            this.subjectsAPIService
              .deleteSubject(subject.subjectId)
              .subscribe(() => {
                this.getSubjects();

                this.toaster.success('Subject successfully deleted');
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

  searchQuery(key: keyof GetSubjectsDTO, evt: Event) {
    this.query.page = 1;
    const { target } = evt;
    this.query[key] = encodeURIComponent((target as any).value) as never;
    if (Array.isArray(this.query[key])) {
      this.query[key] = (this.query[key] as any).join(',') as never;
    }
    this.getSubjects();
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
