import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim-add',
  templateUrl: './operation-claim-add.component.html',
  styleUrls: ['./operation-claim-add.component.css']
})
export class OperationClaimAddComponent implements OnInit {
  operationClaimAddForm:FormGroup;
  constructor(private operationClaimService:OperationClaimService,private formBuilder:FormBuilder,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.createoperationClaimAddForm();
  }
  createoperationClaimAddForm(){
    this.operationClaimAddForm=this.formBuilder.group({
      name:['',Validators.required],
    });
  }
  add(){
    if(this.operationClaimAddForm.valid)
    {
      console.log("ok");
      let operationClaimModel=Object.assign({},this.operationClaimAddForm.value);
      this.operationClaimService.add(operationClaimModel).subscribe(response=>{
        this.toastrService.success("response.message","Başarılı");
      },responseError=>{
        this.toastrService.error(responseError.error,"Başarısız")
      })
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }

}
