import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MemberService} from "../../services/member.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {IMember} from "../../models/IMember";


@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.css']
})
export class AddmembersComponent implements OnInit {
  public member:IMember = {
    _id :'',
    name:'',
    email:'',
    gender:'',
    phone:null,
  };
  public errorMessage:string;
  public emptyFields:boolean;

  constructor(public memberService:MemberService, public router:Router) { }

  ngOnInit(): void {
  }

  public submitCreateOrder(){
    if(this.member.name !== '' && this.member.email !== '' && this.member.phone !== null &&
       this.member.gender !== ''){
      this.memberService.createMember(this.member).subscribe((data) => {
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
