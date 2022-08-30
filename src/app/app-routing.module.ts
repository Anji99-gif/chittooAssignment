import { ToppersComponent } from "./toppers/toppers.component";
import { WinnersComponent } from "./winners/winners.component";
import { UsersComponent } from "./users/users.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"users",pathMatch:"full"},
  {path:"users", component:UsersComponent},
  {path:"winners", component:WinnersComponent},
  {path:"toppers", component:ToppersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
