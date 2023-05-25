import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';
import { TicketDto } from 'src/app/models/ticketDto';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  ticketDtos:  TicketDto[] = [];
  dataLoaded = false;
  constructor(
    private  ticketService:  TicketService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllTicketDto();
  }
  getAllTicketDto() {
    this.ticketService.getAllTicketDto().subscribe((response) => {
      this.ticketDtos = response.data;
      this.dataLoaded = true;
    });
  }
  delete(id: number) {
    if (id) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {

        this.ticketService.getById(id).subscribe(response=>{
          let ticket:Ticket=response.data;        
        this.ticketService.delete(ticket).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getAllTicketDto();
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });        
      })}
    }
  }
}