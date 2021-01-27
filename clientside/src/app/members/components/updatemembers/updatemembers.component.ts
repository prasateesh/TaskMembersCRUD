import { Component, OnInit } from '@angular/core';
import {IMember} from "../../models/IMember";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";

@Component({
  selector: 'app-updatemembers',
  templateUrl: './updatemembers.component.html',
  styleUrls: ['./updatemembers.component.css']
})
export class UpdatemembersComponent implements OnInit {
  public orders:IMember = {
    _id :'',
    name:'',
    email:'',
    gender:'',
    phone:null
  };
  public selectedMember:IMember;
  public memberId:string;
  public errorMessage:string;
  public emptyFields:boolean

  constructor( public activatedRouter:ActivatedRoute, public memberService:MemberService, public router:Router) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param:ParamMap)=>{
      this.memberId=param.get('id');
    });
    this.memberService.getMember(this.memberId).subscribe((data)=>{
      this.selectedMember=data
    },(error)=>{
      this.errorMessage=error;
    })
  }

  public submitUpdateMember(){
    if(this.selectedMember.name !== '' && this.selectedMember.gender !== '' && this.selectedMember.phone !== null &&
       this.selectedMember.email !== '' ){
      this.memberService.updateMember(this.selectedMember,this.memberId).subscribe((data) => {
        this.router.navigate(['/members/memberslist']);
      }, (error) => {
        this.errorMessage = error;
      });
    }
    else{
      this.emptyFields = true;
    }
  }
  Cancel()
  {
    this.router.navigate(['members/memberslist']);
  }
}
