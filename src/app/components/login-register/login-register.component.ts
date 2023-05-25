import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerAddDto } from 'src/app/models/customerAddDto';
import { Gender } from 'src/app/models/gender';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { UserDto } from 'src/app/models/userDto';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { GenderService } from 'src/app/services/gender.service';
import { LocalService } from 'src/app/services/local.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
registerOrLogin="login";
loginForm:FormGroup;
registerForm:FormGroup;
genders:Gender[];
userDetail:UserDto;
navigatePage:string="" ;
  constructor(private genderService:GenderService,private authService:AuthService,
    private operationClaimService:OperationClaimService,private formBuilder:FormBuilder,
    private customerService:CustomerService,
    private localService:LocalService,private userService:UserService, private router:Router,    
    private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.registerOrLogin=params["registerOrLogin"];
    });
    this.createRegisterForm();
    this.createLoginForm();
    this.getGenders();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identityNumber:['', Validators.required],
      phoneNumber:['',Validators.required],
      email: ['', Validators.required],
      genderName: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  getUserDetailsByMail(email:string){
    this.userService.getUserDetailsByEmail(email).subscribe((response) => { 
      this.userDetail = response.data    
      console.log(this.userDetail);
      this.localService.add("user_details" , JSON.stringify(this.userDetail))
    })
  }

  login(){
    if (this.loginForm.valid) {
      
      this.getUserDetailsByMail(this.loginForm.value.email) 
      let loginModel:LoginModel = Object.assign({},this.loginForm.value) 
   
      this.authService.login(loginModel).subscribe((response) => {
        this.toastrService.success(response.message,"Başarılı")      
        this.localService.add("token" , response.data.token)
        this.router.navigate([this.navigatePage]).then(()=>{
        window.location.reload()
        });    
        
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Başarısız")
      })
     
     }
  }
  register(){
    this.operationClaimService.getByOperationClaimName('customer').subscribe(response=>{ 
    if (this.registerForm.valid) {
      if (this.registerForm.get('password')?.value == this.registerForm.get('passwordRepeat')?.value) {          
        let customerAddDtoModel: CustomerAddDto = {
          id:1,
          identityNumber: this.registerForm.get('identityNumber')?.value,
          firstName: this.registerForm.get('firstName')?.value,
          lastName: this.registerForm.get('lastName')?.value,
          phoneNumber: this.registerForm.get('phoneNumber')?.value,
          genderId: Number(
            this.genders.find(
              (x) => x.genderName == this.registerForm.get('genderName')?.value
            )?.id
          ),
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
        };
        this.customerService.add(customerAddDtoModel).subscribe(response=>{
          this.toastrService.success(response.message,"Başarılı");
        }, responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      }
      else{
        this.toastrService.error("Girilen şifreler aynı değil")
      }
    }    
    else {
      this.toastrService.error("Formu eksiksiz doldurunuz.");
    }
  })
  }
  selectLoginOrRegister(select:string){
    this.registerOrLogin=select;

  }
  getGenders(){
    this.genderService.getAll().subscribe(response=>{
      this.genders=response.data;
    })
  }
}
