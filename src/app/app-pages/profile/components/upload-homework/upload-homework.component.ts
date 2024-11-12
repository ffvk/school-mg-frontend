import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Homework } from 'src/app/shared/models/homeworks/homework';
import { HomeworksApiService } from 'src/app/shared/services/api/homeworks.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { AppSettings } from 'src/app/shared/settings/app-settings';

@Component({
  selector: 'app-upload-homework',
  templateUrl: './upload-homework.component.html',
  styleUrls: ['./upload-homework.component.scss'],
})
export class UploadHomeworkComponent implements OnInit {
  @ViewChild('uploadPhotoForm', { static: false }) uploadPhotoForm: any;
  @Input() homework: Homework = new Homework();
  @Input() profilePic: any = null;

  APP_SETTINGS = AppSettings;
  mimeTypes = this.APP_SETTINGS.MIME_TYPES;

  isDisabled: boolean = false;

  allowedFileFormats: string[] = ['image/png', 'image/jpeg'];

  constructor(
    public readonly modalController: ModalController,
    public readonly toaster: ToasterService,
    private readonly homeworksAPIService: HomeworksApiService
  ) {}

  ngOnInit() {
    if (this.homework.homeworkId) {
      this.isDisabled = true;
    }
  }

  async save() {
    if (!this.profilePic) {
      this.toaster.error('Please upload file first');
      return;
    }

    await lastValueFrom(
      this.homeworksAPIService.uploadHomeworkFile(
        this.homework.homeworkId,
        this.profilePic
      )
    );

    this.toaster.success('ProfilePhoto successfully updated');

    this.modalController.dismiss(this.homework);
  }

  readFile(evt: Event) {
    this.profilePic = (evt.target as HTMLInputElement).files?.item(0) ?? null;
  }

  removeFile() {
    this.profilePic = null;
  }
}
