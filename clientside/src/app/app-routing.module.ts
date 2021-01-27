import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./root/components/home/home.component";

const routes: Routes = [{path:'',component:HomeComponent},
  { path: 'members', loadChildren: () => import('./members/members.module').then(m => m.MembersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
