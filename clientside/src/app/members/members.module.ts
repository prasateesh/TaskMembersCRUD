import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { AddmembersComponent } from './components/addmembers/addmembers.component';
import { UpdatemembersComponent } from './components/updatemembers/updatemembers.component';
import {RouterModule} from "@angular/router";
import {MemberlistComponent} from './components/memberlist/memberlist.component'
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [MemberlistComponent,MembersComponent, AddmembersComponent, UpdatemembersComponent],
  imports: [
    CommonModule,
    MembersRoutingModule, ReactiveFormsModule, FormsModule, RouterModule, AgGridModule,HttpClientModule
  ]
})
export class MembersModule { }
