import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,} from '@angular/common/http'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { BusTypeAddComponent } from './components/bus-type-add/bus-type-add.component';
import { BusTypeUpdateComponent } from './components/bus-type-update/bus-type-update.component';
import { CityAddComponent } from './components/city-add/city-add.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityUpdateComponent } from './components/city-update/city-update.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { RouteAddComponent } from './components/route-add/route-add.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteUpdateComponent } from './components/route-update/route-update.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketUpdateComponent } from './components/ticket-update/ticket-update.component';
import { TownAddComponent } from './components/town-add/town-add.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TripAddComponent } from './components/trip-add/trip-add.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripUpdateComponent } from './components/trip-update/trip-update.component';
import { TripStateAddComponent } from './components/trip-state-add/trip-state-add.component';
import { TripStateListComponent } from './components/trip-state-list/trip-state-list.component';
import { TripStateUpdateComponent } from './components/trip-state-update/trip-state-update.component';
import { SelectSeatComponent } from './components/select-seat/select-seat.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { TownListComponent } from './components/town-list/town-list.component';
import { TownUpdateComponent } from './components/town-update/town-update.component';
import { AdminComponent } from './components/admin/admin.component';
import { BusTypeListComponent } from './components/bus-type-list/bus-type-list.component';
import { OperationClaimAddComponent } from './components/operation-claim-add/operation-claim-add.component';
import { OperationClaimListComponent } from './components/operation-claim-list/operation-claim-list.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { OperationClaimUpdateComponent } from './components/operation-claim-update/operation-claim-update.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { TryComponent } from './components/try/try.component';
@NgModule({
  declarations: [
    AppComponent,
    UserAddComponent,
    NavComponent,
    LoginRegisterComponent,
    BusTypeListComponent,
    BusTypeAddComponent,
    BusTypeUpdateComponent,
    CityAddComponent,
    CityListComponent,
    CustomerListComponent,
    CityUpdateComponent,
    CustomerAddComponent,
    CustomerUpdateComponent,
    RouteAddComponent,
    RouteListComponent,
    RouteUpdateComponent,
    TicketAddComponent,
    TicketListComponent,
    TicketUpdateComponent,
    TownAddComponent,
    UserListComponent,
    TripAddComponent,
    TripListComponent,
    TripUpdateComponent,
    TripStateAddComponent,
    TripStateListComponent,
    TripStateUpdateComponent,
    SelectSeatComponent,
    TownListComponent,
    TownUpdateComponent,
    AdminComponent,
    OperationClaimAddComponent,
    OperationClaimListComponent,
    UserUpdateComponent,
    OperationClaimUpdateComponent,
    CustomerHomeComponent,
    TryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
