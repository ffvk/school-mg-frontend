import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { RouteSettings } from '../../settings/route-settings';

import { CreateSubjectDTO } from '../../dtos/subjects/create-subject-dto/create-subject-dto';
import { GetSubjectsDTO } from '../../dtos/subjects/get-subjects-dto/get-subjects-dto';
import { UpdateSubjectDTO } from '../../dtos/subjects/update-subject-dto/update-subject-dto';
import { Subject } from '../../models/subjects/subject';
import { Subjects } from '../../models/subjects/subjects';

@Injectable({
  providedIn: 'root',
})
export class SubjectsApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getSubjects(query?: GetSubjectsDTO): Observable<Subjects> {
    let httpParams = new HttpParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        httpParams = httpParams.append(key, value);
      });
    }

    let getSubjectsURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SUBJECTS.GET;

    return this.httpClient.get(getSubjectsURL, { params: httpParams }).pipe(
      map(
        (response: { [key: string]: any }) =>
          new Subjects(
            response['data'] || {
              totalCount: 0,
              currentCount: 0,
              subjects: [],
            }
          )
      )
    );
  }

  createSubject(createSubjectDTO: CreateSubjectDTO): Observable<Subject> {
    let createSubjectURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SUBJECTS.CREATE;

    return this.httpClient
      .post(createSubjectURL, createSubjectDTO)
      .pipe(
        map((response: { [key: string]: any }) => new Subject(response['data']))
      );
  }

  updateSubject(updateSubjectDTO: UpdateSubjectDTO): Observable<Subject> {
    let updateSubjectURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SUBJECTS.UPDATE;

    return this.httpClient
      .put(updateSubjectURL, updateSubjectDTO)
      .pipe(
        map((response: { [key: string]: any }) => new Subject(response['data']))
      );
  }

  deleteSubject(subjectId: string): Observable<null> {
    let deleteSubjectUrl: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SUBJECTS.DELETE;

    return this.httpClient
      .request('delete', deleteSubjectUrl, {
        body: { subjectId },
      })
      .pipe(map((response) => null));
  }
}
