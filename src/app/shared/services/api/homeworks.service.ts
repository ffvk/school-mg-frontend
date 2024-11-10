import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RouteSettings } from '../../settings/route-settings';
import { Homeworks } from '../../models/homeworks/homeworks';
import { GetHomeworksDTO } from '../../dtos/homeworks/get-homeworks-dto/get-homeworks-dto';
import { CreateHomeworkDTO } from '../../dtos/homeworks/create-homework-dto/create-homework-dto';
import { Homework } from '../../models/homeworks/homework';
import { UpdateHomeworkDTO } from '../../dtos/homeworks/update-homework-dto/update-homework-dto';

@Injectable({
  providedIn: 'root',
})
export class HomeworksService {
  constructor(private readonly httpClient: HttpClient) {}

  getHomeworks(query?: GetHomeworksDTO): Observable<Homeworks> {
    let httpParams = new HttpParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        httpParams = httpParams.append(key, value);
      });
    }

    let getHomeworksURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.HOMEWORKS.GET;

    return this.httpClient.get(getHomeworksURL, { params: httpParams }).pipe(
      map(
        (response: { [key: string]: any }) =>
          new Homeworks(
            response['data'] || {
              totalCount: 0,
              currentCount: 0,
              homeworks: [],
            }
          )
      )
    );
  }

  createHomework(createHomeworkDTO: CreateHomeworkDTO): Observable<Homework> {
    let createHomeworkURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.HOMEWORKS.CREATE;

    return this.httpClient
      .post(createHomeworkURL, createHomeworkDTO)
      .pipe(
        map(
          (response: { [key: string]: any }) => new Homework(response['data'])
        )
      );
  }

  updateHomework(updateHomeworkDTO: UpdateHomeworkDTO): Observable<Homework> {
    let updateHomeworkURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.HOMEWORKS.UPDATE;

    return this.httpClient
      .put(updateHomeworkURL, updateHomeworkDTO)
      .pipe(
        map(
          (response: { [key: string]: any }) => new Homework(response['data'])
        )
      );
  }

  deleteHomework(homeworkId: string): Observable<null> {
    let deleteHomeworkUrl: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.HOMEWORKS.DELETE;

    return this.httpClient
      .request('delete', deleteHomeworkUrl, {
        body: { homeworkId },
      })
      .pipe(map((response) => null));
  }
}
