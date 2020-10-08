import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Member } from '../models/member';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { IPartSettingsService } from '../services/ipart-settings.service';
import { Helper } from '../utils/helper';
import { ApiService } from './api.service';
import { ContentKeysService } from './content-keys.service';


@Injectable()
export class LocalMemberService {

 // constructor(private http: HttpClient ) {   }

 member : Member;
 settingsSubscription: Subscription;
 data: string[] = [];
 IQA_URL: string = "";

  constructor(private http: HttpClient) {
     }


  


 getMembers(IQA:string): Observable<Member[]> {

  
   
    
    //let url =  '/api/IQA?QueryName=$/ContactManagement/DefaultSystem/Queries/Contacts/Default&limit=1000';

    let baseURL = '/api';
    let url = baseURL+IQA;
   // let url =  '/api/IQA?QueryName=$/ContactManagement/DefaultSystem/Queries/Contacts/Default&limit=1000';
    
  
    let authToken = (document.getElementById('__RequestVerificationToken') as HTMLInputElement).value;

    
      return this.http.get(url, {headers: { 'RequestVerificationToken': authToken }})
        .map((res:any)=> {
          console.log(res.Items[0]);
        let results = res.Items.$values.map ( item => {
            return new Member(
             
              item.Properties.$values[2].Value,
              item.Properties.$values[3].Value,
              item.Properties.$values[4].Value,
              item.Properties.$values[5].Value,
              item.Properties.$values[7].Value,
         
                )
        });
        return results;
    });

    



}
  
}
