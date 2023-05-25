import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { BusTypeListComponent } from './components/bus-type-list/bus-type-list.component';
import { BusTypeAddComponent } from './components/bus-type-add/bus-type-add.component';
import { BusTypeUpdateComponent } from './components/bus-type-update/bus-type-update.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { TownAddComponent } from './components/town-add/town-add.component';
import { CityAddComponent } from './components/city-add/city-add.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityUpdateComponent } from './components/city-update/city-update.component';
import { RouteAddComponent } from './components/route-add/route-add.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { RouteUpdateComponent } from './components/route-update/route-update.component';
import { TripAddComponent } from './components/trip-add/trip-add.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripUpdateComponent } from './components/trip-update/trip-update.component';
import { TripStateListComponent } from './components/trip-state-list/trip-state-list.component';
import { TripStateAddComponent } from './components/trip-state-add/trip-state-add.component';
import { TripStateUpdateComponent } from './components/trip-state-update/trip-state-update.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { TownListComponent } from './components/town-list/town-list.component';
import { TownUpdateComponent } from './components/town-update/town-update.component';
import { OperationClaimAddComponent } from './components/operation-claim-add/operation-claim-add.component';
import { OperationClaimListComponent } from './components/operation-claim-list/operation-claim-list.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { OperationClaimUpdateComponent } from './components/operation-claim-update/operation-claim-update.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { SelectSeatComponent } from './components/select-seat/select-seat.component';
import { TryComponent } from './components/try/try.component';
import { TicketUpdateComponent } from './components/ticket-update/ticket-update.component';
import { LoginGuard } from './guards/login.guard';



const routes: Routes = [
  {path:"",pathMatch:"full", component:CustomerHomeComponent},
  {path:"admin",pathMatch:"full", component:AdminComponent, canActivate:[LoginGuard]},
  {path:"bustypes/add", component:BusTypeAddComponent},  
  {path:"bustypes/update/:id", component:BusTypeUpdateComponent},
  {path:"bustypes/list", component:BusTypeListComponent},
  {path:"tripstate/add", component:TripStateAddComponent},
  {path:"tripstate/list", component:TripStateListComponent},
  {path:"tripstate/update/:id", component:TripStateUpdateComponent},  
  {path:"user/add", component:UserAddComponent},  
  {path:"user/list", component:UserListComponent},  
  {path:"user/update/:id", component:UserUpdateComponent},
  {path:"customer/add", component:CustomerAddComponent}, 
  {path:"customer/list", component:CustomerListComponent},  
  {path:"customer/update/:id", component:CustomerUpdateComponent},
  {path:"town/add", component:TownAddComponent}, 
  {path:"town/list", component:TownListComponent},  
  {path:"town/update/:id", component:TownUpdateComponent},
  {path:"city/add", component:CityAddComponent}, 
  {path:"city/list", component:CityListComponent},  
  {path:"city/update/:id", component:CityUpdateComponent},
  {path:"route/add", component:RouteAddComponent}, 
  {path:"route/list", component:RouteListComponent},  
  {path:"operationClaim/add", component:OperationClaimAddComponent}, 
  {path:"operationClaim/list", component:OperationClaimListComponent},  
  {path:"operationClaim/update/:id", component:OperationClaimUpdateComponent},
  {path:"route/update/:id", component:RouteUpdateComponent},
  {path:"trip/add", component:TripAddComponent}, 
  {path:"trip/list", component:TripListComponent},  
  {path:"trip/update/:id", component:TripUpdateComponent},
  {path:"ticket/add", component:TicketAddComponent}, 
  {path:"ticket/list", component:TicketListComponent},  
  {path:"ticket/update/:id", component:TicketUpdateComponent},
  {path:"loginRegister/:registerOrLogin",pathMatch:"full", component:LoginRegisterComponent},
  {path:"try", component:TryComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
