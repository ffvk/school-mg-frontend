import { Injectable } from '@angular/core';
import { GetUsersDTO } from '../../dtos/users/get-users-dto/get-users.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Users } from '../../models/users/users';
import { RouteSettings } from '../../settings/route-settings';
import { RegisterUserDTO } from '../../dtos/users/register-user-dto/register-user.dto';
import { User } from '../../models/users/user';
import { UpdateUserDTO } from '../../dtos/users/update-user-dto/update-user.dto';
import { LoginUserDTO } from '../../dtos/users/login-user-dto/login-user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers(query?: GetUsersDTO): Observable<Users> {
    let httpParams = new HttpParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        httpParams = httpParams.append(key, value);
      });
    }

    let getUsersURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.USERS.GET;

    return this.httpClient.get(getUsersURL, { params: httpParams }).pipe(
      map(
        (response: { [key: string]: any }) =>
          new Users(
            response['data'] || {
              totalCount: 0,
              currentCount: 0,
              users: [],
            }
          )
      )
    );
  }

  registerUser(registerUserDTO: RegisterUserDTO): Observable<User> {
    let registerUserURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.USERS.CREATE;

    return this.httpClient
      .post(registerUserURL, registerUserDTO)
      .pipe(
        map((response: { [key: string]: any }) => new User(response['data']))
      );
  }

  updateUser(updateUserDTO: UpdateUserDTO): Observable<User> {
    let updateUserURL: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.USERS.UPDATE;

    return this.httpClient
      .put(updateUserURL, updateUserDTO)
      .pipe(
        map((response: { [key: string]: any }) => new User(response['data']))
      );
  }

  deleteUser(userId: string): Observable<null> {
    let deleteUserUrl: string =
      RouteSettings.BASE_URL + RouteSettings.ENDPOINTS.USERS.DELETE;

    return this.httpClient
      .request('delete', deleteUserUrl, {
        body: { userId },
      })
      .pipe(map((response) => null));
  }

  loginUser(loginUserDTO: LoginUserDTO): Observable<User> {
    let loginUserURL: string =
      RouteSettings.BASE_URL +
      RouteSettings.ENDPOINTS.USERS.CREATE_SESSION_EMAIL;

    return this.httpClient
      .post(loginUserURL, loginUserDTO)
      .pipe(
        map((response: { [key: string]: any }) => new User(response['data']))
      );
  }
}
