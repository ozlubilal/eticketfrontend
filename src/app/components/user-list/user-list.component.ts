import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserDto } from 'src/app/models/userDto';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userDtos: UserDto[] = [];
  dataLoaded = false;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUserDto();
  }
  getAllUserDto(){
    this.userService.GetAllUserDto().subscribe((response) => {
      this.userDtos = response.data;
      this.dataLoaded = true;
      
    })
  }
 
  delete(id: number) {
    if (id) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {

        this.userService.getById(id).subscribe(response=>{
          let user:User=response.data;        
        this.userService.delete(user).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getAllUserDto();
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      })}
    }
  }
}
