import { Component, OnInit } from '@angular/core';
import { HelperService,GeneratorService } from '@idapp/api/services';
import { ManagementDomainResponse,ServiceOwnerResponse,ServiceTypeResponse,ISIdRequest} from '@idapp/api/models';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'isservice-id-generator',
  templateUrl: './isservice-id-generator.component.html',
  styleUrls: ['./isservice-id-generator.component.css']
})
export class ISServiceIdGeneratorComponent implements OnInit {

    public managementDomains : ManagementDomainResponse;
    public serviceOwners : ServiceOwnerResponse;
    public isServiceTypes: ServiceTypeResponse;
    public idRequest : ISIdRequest = <ISIdRequest>{};
    public selectedServiceType=null;
    public selectedServiceOwner=null;
    public selectedMD=null;
    public requestPending : boolean=false;
    public generatedIds=null;

    public ownerSelectionDisabled:boolean=true;
    public mdSelectionDisabled:boolean=true;

  constructor(
    private genHelperService: HelperService,
    private generatorService:GeneratorService,
    private alertService:AlertService
  ) {


  }

  ngOnInit() {
      this.idRequest.count=1;
      this.generatedIds="";

      this.genHelperService.getApiV1ManagementDomain().subscribe(res => {
          this.managementDomains = res;
          this.selectedMD = this.managementDomains[0];

      });
      this.genHelperService.getApiV1ServiceOwner().subscribe(res => {
          this.serviceOwners = res;
          this.selectedServiceOwner = this.serviceOwners[0];

      });
      this.genHelperService.getApiV1IsServiceType().subscribe(res => {

          this.isServiceTypes = [{"name":"Bitte wählen","id":"none"}];

          this.isServiceTypes = this.isServiceTypes.concat(res);
          //this.selectedServiceType = this.isServiceTypes[0];


      });
      //getApiV1CfServiceType

  }

  onServiceTypeChange(event) {
    let serviceType = event.value;
    if (serviceType.prefixTemplate){
        this.ownerSelectionDisabled=true;
        this.mdSelectionDisabled=true;
        if (serviceType.prefixTemplate.includes("##OWNER##")){
            this.ownerSelectionDisabled=false;
        }
        if (serviceType.prefixTemplate.includes("##MD##")){
            this.mdSelectionDisabled=false;
        }
    }
  }

  isRequestDirty(){
      if (!this.selectedServiceType){
          return true;
      }

      if (this.selectedServiceType.id=="none"){
          return true;
      }
      return false;
  }

  requestIds() {
      if (this.selectedServiceType.id=="none"){
          return;
      }
      this.requestPending=true;
      this.idRequest.serviceOwner = this.selectedServiceOwner.id;
      this.idRequest.serviceType = this.selectedServiceType.id;
      this.idRequest.md = this.selectedMD.id;

      this.generatorService.postApiV1IsService(this.idRequest).subscribe(res => {
          console.log(res);
          this.generatedIds=res.serviceIds.join("\r\n");
          this.requestPending=false;
      }, err => {
              console.error(err);
              this.alertService.warning('IDs konnten nicht erzeugt werden');
              this.requestPending=false;
      })

  }

}
