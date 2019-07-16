import { Directive,Input,OnInit,
  TemplateRef,
  ElementRef } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {KeycloakAuthorizationService,KeycloakResourcePermissionsCheck} from 'keycloak-authz-angular';


@Directive({
  selector: '[has-keycloak-authorization]'
})
export class HasKeycloakAuthorizationDirective {
    
    @Input('has-keycloak-authorization') requiredAuthorization: string;
    
    private action;

  constructor(
    private element: ElementRef, 
    private keycloakAngular: KeycloakService,
    private authService:KeycloakAuthorizationService
    ) { }
    
    ngOnInit() {
        
        if(!this.action) {
            this.action = "STATE";
        }
        this.noAuthPresentAction();

        let authCheck = <KeycloakResourcePermissionsCheck>{};
        let requiredScope = null;
        if (this.requiredAuthorization.includes("#")){
            let authArr = this.requiredAuthorization.split("#");
            authCheck = {
                 rsname:authArr[0],
                 scope:authArr[1]
            };
        } else {
            authCheck = {
                 rsname:this.requiredAuthorization
             };
        }

        this.keycloakAngular.isLoggedIn().then(async res => {
           if(this.authService.checkAuthorization(authCheck)){
                this.authPresentAction();    
                
            }
        });

     }
     
     private authPresentAction(){

         switch(this.action){
             case 'VISIBILITY':
             
             break;
             case 'STATE':
                this.element.nativeElement.disabled = false;
             break;
         }
     }
     
     private noAuthPresentAction(){
         switch(this.action){
             case 'VISIBILITY':
             
             break;
             case 'STATE':
                this.element.nativeElement.disabled = true;
             break;
         }
     }
     


}
