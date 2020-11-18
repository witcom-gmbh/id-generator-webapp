import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { AuthztestComponent } from './authztest/authztest.component';
import { AppAuthGuard } from './app-authguard';
import { AppResolverService } from './services/app-resolver.service';

const routes: Routes = [
    {
      path: 'home', component: HomeComponent,canActivate: [AppResolverService]
    },
    {
      path: 'authztest', component: AuthztestComponent,canActivate: [AppAuthGuard] ,data:{permissions:[{
          rsname:"cf-service",
          scope:"create"
      }]}
    },

    {
        path: '', redirectTo: '/home', pathMatch: 'full',canActivate: [AppResolverService]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
providers: [AppAuthGuard]
})
export class AppRoutingModule { }
