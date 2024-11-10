import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GetSubjectsDTO } from 'src/app/shared/dtos/subjects/get-subjects-dto/get-subjects-dto';
import { Subjects } from 'src/app/shared/models/subjects/subjects';
import { User } from 'src/app/shared/models/users/user';
import { SubjectsApiService } from 'src/app/shared/services/api/subjects.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  subjects: Subjects = new Subjects();
  me: User = new User();

  query: GetSubjectsDTO = {
    limit: -1,
    page: 1,
  };
  constructor(
    private readonly userLocalService: UserLocalService,
    private readonly router: Router,
    private subjectsApiService: SubjectsApiService
  ) {}

  async ngOnInit() {
    this.me = this.userLocalService.getMe();

    if (!this.me?.email?.verified) {
      this.router.navigate(['/verify-email']);
      return;
    }

    if (this.me.role === 'ADMIN') {
      await this.fetchSubjects(this.query);
    } else if (this.me.role === 'ROOT') {
      this.query.userId = this.me.userId;
      await this.fetchSubjects(this.query);
    }
  }

  async fetchSubjects(query: GetSubjectsDTO) {
    try {
      this.subjects = await lastValueFrom(
        this.subjectsApiService.getSubjects(query)
      );
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
  }
}
