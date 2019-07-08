import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {KeycloakAuthorizationService} from '@idapp/services/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private keycloakAngular: KeycloakService,private authService:KeycloakAuthorizationService) { }
  
  isISServiceDisabled = true;
  isCFServiceDisabled = true;
  
  isISServiceEnabled = false;
  isCFServiceEnabled = false;  

  ngOnInit() {
      
      this.keycloakAngular.isLoggedIn().then(res => {
         if (res){
             //this.authService.entitlement('id-generator-service').then(perm => {console.log(perm)}); 
             var authorizationRequest = {
   "permissions": [
       {
           "id" : "sequence",
           "scopes" : ["view"] 
       }
   ]
};

             let authCheck = {
                 rsname:"sequence",
                 scope:"view"
             };
             
             //this.authService.checkAuthorization(authCheck);
             this.authService.getPermissions();
             let roles = this.keycloakAngular.getUserRoles(true);
             //roles = [];
             if (roles.indexOf('cf-id-generate') !== -1){
                 this.isCFServiceDisabled=false;
                 //this.isCFServiceEnabled=true;
                 
             }
             if (roles.indexOf('is-id-generate') !== -1){
                 this.isISServiceDisabled=false;
                 //this.isISServiceEnabled=true;
             }             
             //this.element.nativeElement.style.display = 'none';
             
         }
        });
  }
  
  toggleGenerator(generator){
      switch (generator){
          case 'isservice':
          this.isISServiceEnabled=true;
          this.isCFServiceEnabled=false;
          break;
          case 'cfservice':
          this.isCFServiceEnabled=true;
          this.isISServiceEnabled=false;
          break;
          
        
          
      }
      
      
      
  }

}
