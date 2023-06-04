import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'upload',
    component: UploadVideoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'video/:id',
    component: WatchVideoComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'create-account', component: CreateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
