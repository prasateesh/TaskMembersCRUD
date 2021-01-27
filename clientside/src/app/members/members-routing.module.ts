import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MembersComponent } from './members.component';
import {MemberlistComponent} from "./components/memberlist/memberlist.component";
import {AddmembersComponent} from "./components/addmembers/addmembers.component";
import {UpdatemembersComponent} from "./components/updatemembers/updatemembers.component";

const routes: Routes = [{ path: '', component: MembersComponent },
  {path:'memberslist', component:MemberlistComponent},
  {path:'addmember', component:AddmembersComponent},
  {path:':id',component:UpdatemembersComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
