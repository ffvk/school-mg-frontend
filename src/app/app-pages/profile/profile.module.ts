import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicComponent } from './components/basic/basic.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { UploadHomeworkComponent } from './components/upload-homework/upload-homework.component';
import { Homework } from 'src/app/shared/models/homeworks/homework';
import { HomeworkFormComponent } from './components/homework-form/homework-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    ProfilePage,
    BasicComponent,
    StudentsComponent,
    TeachersComponent,
    SubjectsComponent,
    HomeworksComponent,
    UploadHomeworkComponent,
    HomeworkFormComponent,
  ],
})
export class ProfilePageModule {}
