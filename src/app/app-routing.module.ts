import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BartenderComponent } from './bartender/bartender.component';

const routes: Routes = [
  {path: '', component: BartenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
