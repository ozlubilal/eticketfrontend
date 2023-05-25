import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/OperationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim-list',
  templateUrl: './operation-claim-list.component.html',
  styleUrls: ['./operation-claim-list.component.css']
})
export class OperationClaimListComponent implements OnInit {
  operationClaims:OperationClaim[];
  dataLoaded=false;
   constructor(  private operationClaimService: OperationClaimService,
     private toastrService: ToastrService) { }
 
   ngOnInit(): void {
     this.getoperationClaims();
   }
   getoperationClaims() {
     this.operationClaimService.getAll().subscribe((response) => {
       this.operationClaims = response.data;
       this.dataLoaded = true;
     });
   }
   delete(operationClaim: OperationClaim) {
     if (operationClaim) {
       if (confirm('Silmek istediğinize eminmisiniz? ')) {
         this.operationClaimService.delete(operationClaim).subscribe((response) => {
           this.toastrService.warning(response.message, 'Başarılı');
           this.getoperationClaims();
         },
         responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
         });
       }
     }
   }
 }
