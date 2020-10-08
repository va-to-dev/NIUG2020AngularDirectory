import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import {LocalMemberService} from '../services/localMember.service';
import { FilterPipe }from '../filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Member } from '../models/member';
import { IPartSettingsService } from '../services/ipart-settings.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-conomember-list',
  templateUrl: './conomember-list.component.html',
  styleUrls: ['./conomember-list.component.scss']
})
export class ConomemberListComponent implements OnInit {

  title ="Members Directory";

  constructor(private localMemberService:LocalMemberService, private iPartSettingsService: IPartSettingsService) { 
    
  }
  members: Member[];

  ngOnInit() {

    

    
 var settingtest = this.iPartSettingsService.GetSettings().subscribe(data => {
  console.log(data);

  if(data!=null){
          for (let [key, value] of Object.entries(data)) {
            console.log(key);
           if(`${key}`=="anotherSetting"){
             var d = `${value}`;
            
             if(d!=""){
               console.log("anotherSetting");
               console.log("-------------");
               console.log(d);
               //this.IQA_URL = d;
               this.getMembers(d);
              
             }
             else{
         
             }
                 
             }
            

         }
        }

        });





  }

  getMembers(d:string): void {
    this.localMemberService.getMembers(d)
        .subscribe(data => this.members = data);

  }


}
