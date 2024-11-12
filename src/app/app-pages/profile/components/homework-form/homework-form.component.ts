import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Homework } from 'src/app/shared/models/homeworks/homework';
import { HomeworksApiService } from 'src/app/shared/services/api/homeworks.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';

@Component({
  selector: 'app-homework-form',
  templateUrl: './homework-form.component.html',
  styleUrls: ['./homework-form.component.scss'],
})
export class HomeworkFormComponent implements OnInit {
  @ViewChild('homeworkForm', { static: false }) homeworkForm: any;
  @Input() homework: Homework = new Homework();
  type: 'create' | 'edit' = 'create';

  constructor(
    public readonly modalController: ModalController,
    private readonly homeworksAPIService: HomeworksApiService,
    public readonly toaster: ToasterService
  ) {}
  ngOnInit() {
    this.type = 'create';

    if (this.homework.homeworkId) {
      this.type = 'edit';
    }
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
}
