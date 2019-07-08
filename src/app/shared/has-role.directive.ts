import { Directive,Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewContainerRef
} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
//import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
    
    @Input() appHasRole: string;
    isVisible = false;
    //stop$ = new Subject();

    constructor(
    private element: ElementRef, 
    private keycloakAngular: KeycloakService
    ) { }
    
    ngOnInit() {

        this.keycloakAngular.isLoggedIn().then(res => {
         if (res){
            let roles = this.keycloakAngular.getUserRoles(true);
            if (!roles) {
                this.element.nativeElement.disabled = true;
            }
            if (roles.indexOf(this.appHasRole) !== -1){
                this.element.nativeElement.disabled = false; 
            } else {

                this.element.nativeElement.disabled = true;
            }

             
         }
        });
        
    };
    

}
