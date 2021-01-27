import { Component, OnInit } from '@angular/core';
import {IMember} from "./models/IMember";
import {MemberService} from "./services/member.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  public errorMessage:string;
  public emptyFields:boolean;
  public members:IMember[]=[];

  constructor(public  memberService:MemberService) { }

  ngOnInit(): void {
    this.memberService.getAllMember().subscribe((data)=>{
      this.members=data;
    },(error)=>{
      this.errorMessage=error;
    });
  }
  public clickDeleteProduct(memberId){
    this.memberService.deleteMember(memberId).subscribe((data) => {
      this.memberService.getAllMember().subscribe((data) => {
        this.members = data;
      }, (error) => {
        console.log(error);
        this.errorMessage = error;
      });
    }, (error) => {
      console.log(error);
      this.errorMessage = error;
    })
  }
}
