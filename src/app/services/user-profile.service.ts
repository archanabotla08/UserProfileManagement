import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserProfileData} from '../model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private getUrl: string = "http://localhost:8080/userService/";
  constructor(
    private httpClient: HttpClient,
    ) { }

    getUserProfileById(id: number): Observable<any> {
      return this.httpClient.get<any>(`${this.getUrl}getUser/${id}`);
    }
    updateUserProfileRecord(user: any ,id: number) {
      return this.httpClient.put<UserProfileData>(`${this.getUrl}updateUser/${id}`, user);
    }
  
}
