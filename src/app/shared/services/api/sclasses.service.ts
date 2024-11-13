import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { RouteSettings } from '../../settings/route-settings';
import { GetSclassesDTO } from '../../dtos/sclasses/get-sclasses-dto/get-sclasses-dto';
import { Sclasses } from '../../models/sclasses/sclasses';
import { CreateSclassDTO } from '../../dtos/sclasses/create-sclass-dto/create-sclass-dto';
import { Sclass } from '../../models/sclasses/sclass';
import { UpdateSclassDTO } from '../../dtos/sclasses/update-sclass-dto/update-sclass-dto';

@Injectable({
  providedIn: 'root',
})
export class SclassesAPIService {
  constructor(private readonly httpClient: HttpClient) {}

  getSclasses(query?: GetSclassesDTO): Observable<Sclasses> {
    let httpParams = new HttpParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        httpParams = httpParams.append(key, value);
      });
    }

    let getSclassesURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SCLASSES.GET;

    return this.httpClient.get(getSclassesURL, { params: httpParams }).pipe(
      map(
        (response: { [key: string]: any }) =>
          new Sclasses(
            response['data'] || {
              totalCount: 0,
              currentCount: 0,
              sclasss: [],
            }
          )
      )
    );
  }

  createSclass(createSclassDTO: CreateSclassDTO): Observable<Sclass> {
    let createSclassURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SCLASSES.CREATE;

    return this.httpClient
      .post(createSclassURL, createSclassDTO)
      .pipe(
        map((response: { [key: string]: any }) => new Sclass(response['data']))
      );
  }

  updateSclass(updateSclassDTO: UpdateSclassDTO): Observable<Sclass> {
    let updateSclassURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SCLASSES.UPDATE;

    return this.httpClient
      .put(updateSclassURL, updateSclassDTO)
      .pipe(
        map((response: { [key: string]: any }) => new Sclass(response['data']))
      );
  }

  deleteSclass(sclassId: string): Observable<null> {
    let deleteSclassUrl: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.SCLASSES.DELETE;

    return this.httpClient
      .request('delete', deleteSclassUrl, {
        body: { sclassId },
      })
      .pipe(map((response) => null));
  }
}
