import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/OperationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim-update',
  templateUrl: './operation-claim-update.component.html',
  styleUrls: ['./operation-claim-update.component.css']
})
export class OperationClaimUpdateComponent implements OnInit {

  constructor(private operationClaimService:OperationClaimService,private toastrService:ToastrService,
    private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router,) { }
   operationClaimUpdateForm:FormGroup;
   operationClaim:OperationClaim;
   id:number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.id=(params["id"]);
    this.getoperationClaimById();
    
    })
  
    
  }
  createoperationClaimUpdateForm(){
    this.operationClaimUpdateForm=this.formBuilder.group({
      id:[this.operationClaim.id,Validators.required],
      name:[this.operationClaim.name,Validators.required],
    })
  }
  getoperationClaimById(){
    this.operationClaimService.getById(this.id).subscribe(response=>{
         this.operationClaim=response.data;
         this.createoperationClaimUpdateForm();
         console.log(response.data)
    })
  }
  update(){
    if(this.operationClaimUpdateForm.valid){
      let operationClaimModel=Object.assign({},this.operationClaimUpdateForm.value);
      this.operationClaimService.update(operationClaimModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error.message,"Başarısız");
        });     
        setTimeout(()=>{                          
          this.router.navigate(['operationClaim/list'])
      }, 5000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
  }

}