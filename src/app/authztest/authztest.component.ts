import { Component, OnInit } from '@angular/core';
import {KeycloakAuthorizationService,KeycloakResourcePermission} from 'keycloak-authz-angular';

@Component({
  selector: 'app-authztest',
  templateUrl: './authztest.component.html',
  styleUrls: ['./authztest.component.css']
})
export class AuthztestComponent implements OnInit {
    
    
    private permissions: KeycloakResourcePermission[];

  constructor(private keycloakAuth: KeycloakAuthorizationService) { }

  ngOnInit() {
      
      this.permissions = this.keycloakAuth.getPermissions();
      
      
  }

}
