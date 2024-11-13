import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { GetSclassesDTO } from 'src/app/shared/dtos/sclasses/get-sclasses-dto/get-sclasses-dto';
import { GetUsersDTO } from 'src/app/shared/dtos/users/get-users-dto/get-users.dto';
import { Homework } from 'src/app/shared/models/homeworks/homework';
import { Sclass } from 'src/app/shared/models/sclasses/sclass';
import { Subject } from 'src/app/shared/models/subjects/subject';
import { User } from 'src/app/shared/models/users/user';
import { HomeworksApiService } from 'src/app/shared/services/api/homeworks.service';
import { SclassesAPIService } from 'src/app/shared/services/api/sclasses.service';
import { UsersApiService } from 'src/app/shared/services/api/users-api.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-homework-form',
  templateUrl: './homework-form.component.html',
  styleUrls: ['./homework-form.component.scss'],
})
export class HomeworkFormComponent implements OnInit {
  @ViewChild('homeworkForm', { static: false }) homeworkForm: any;
  @Input() homework: Homework = new Homework();
  @Input() sclasses: Sclass[] = [];
  @Input() subjects: Subject[] = [];
  me: User = new User();

  type: 'create' | 'edit' = 'create';

  sclassQuery: GetSclassesDTO = {
    limit: -1,
    page: 1,
  };

  constructor(
    public readonly modalController: ModalController,
    private readonly homeworksAPIService: HomeworksApiService,
    public readonly toaster: ToasterService,
    private userLocalService: UserLocalService,
    private usersAPIService: UsersApiService
  ) {}
  async ngOnInit() {
    this.type = 'create';

    if (this.homework.homeworkId) {
      this.type = 'edit';
    }
    this.me = this.userLocalService.getMe();
    await this.getCurrentUser();
    console.log('subjects in subjectform ts ', this.subjects);
    console.log('subjects in sclass ts ', this.sclasses);
    console.log('tutorId', this.me);
  }

  async save() {
    if (this.homeworkForm.invalid) {
      for (let key in this.homeworkForm.controls) {
        this.homeworkForm.controls[key].markAsDirty();
        this.homeworkForm.controls[key].markAsTouched();
      }
      this.toaster.error('Please fill the required values');

      return;
    }
    this.homework.tutorId = this.me.userId;
    if (this.type === 'create') {
      try {
        this.homework = await lastValueFrom(
          this.homeworksAPIService.createHomework(this.homework.toCreateDTO())
        );
      } catch (e: any) {
        this.toaster.error(
          e && e.error && e.error.status === 'ERROR'
            ? e.error.message.homework
            : 'An unknown error occurred saving homework'
        );
      }
    } else {
      try {
        await lastValueFrom(
          this.homeworksAPIService.updateHomework(this.homework.toUpdateDTO())
        );
      } catch (e) {}
    }

    this.toaster.success(
      'Artwork successfully ' + (this.type === 'create' ? 'created' : 'updated')
    );

    this.modalController.dismiss(this.homework);
  }

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
}
