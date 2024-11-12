import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { User } from 'src/app/shared/models/users/user';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';
import { BasicComponent } from './components/basic/basic.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, ViewDidEnter {
  // me: User = null;
  me: User = new User();

  tabs: { title: string; component: any }[] = [
    { title: 'Basic Information', component: BasicComponent },
    { title: 'Students Details', component: StudentsComponent },
    { title: 'Teachers Details', component: TeachersComponent },
    { title: 'Subject Details', component: SubjectsComponent },
    { title: 'Homeworks Details', component: HomeworksComponent },
  ];

  constructor(private userLocalService: UserLocalService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.me = this.userLocalService.getMe();
  }
}
