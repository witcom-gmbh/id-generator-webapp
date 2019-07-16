import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { AuthztestComponent } from './authztest/authztest.component';
import { AppAuthGuard } from './app-authguard';

const routes: Routes = [
    {
      path: 'home', component: HomeComponent      
    },
    /*{
      path: 'authztest', component: AuthztestComponent,canActivate: [AppAuthGuard] ,data:{permissions:[{
          rsname:"cf-service",
          scope:"create"  
      }]}
    },*/
    
    {
        path: '', redirectTo: '/home', pathMatch: 'full' 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
providers: [AppAuthGuard]
})
export class AppRoutingModule { }
