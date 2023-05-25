import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerDto } from 'src/app/models/customerDto';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerDtos: CustomerDto[] = [];
  dataLoaded = false;
  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCustomerDto();
  }
  getAllCustomerDto() {
    this.customerService.getAllCustomerDto().subscribe((response) => {
      this.customerDtos = response.data;
      this.dataLoaded = true;
    });
  }
  delete(id: number) {
    if (id) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {

        this.customerService.getById(id).subscribe(response=>{
          let customer:Customer=response.data;        
        this.customerService.delete(customer).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getAllCustomerDto();
        },responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      })}
    }
  }
}