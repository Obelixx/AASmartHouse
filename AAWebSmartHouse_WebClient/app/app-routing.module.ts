import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByAuthenticatedUserGuard, ByUnauthenticatedUserGuard } from './shared/guards/index';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/components/home/home.component';
import { UserLoginComponent } from './user/components/user-login/user-login.component';
import { UserRegisterComponent } from './user/components/user-register/user-register.component';
import { UserDetailsComponent } from './user/components/user-details/user-details.component';
import { HouseListComponent } from './house/components/house-list/house-list.component';
import { RoomListComponent } from './room/components/room-list/room-list.component';
import { SensorListComponent } from './sensor/components/sensor-list/sensor-list.component';
import { SensorValueTableComponent } from './sensor-value/components/sensor-value-table/sensor-value-table.component';
import { SensorValueChartComponent } from './sensor-value/components/sensor-value-chart/sensor-value-chart.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-login', component: UserLoginComponent, canActivate: [ByUnauthenticatedUserGuard] },
  { path: 'user-register', component: UserRegisterComponent, canActivate: [ByUnauthenticatedUserGuard] },
  { path: 'user-details', component: UserDetailsComponent, canActivate: [ByAuthenticatedUserGuard] },
  { path: 'house-list', component: HouseListComponent, canActivate: [ByAuthenticatedUserGuard] },
  { path: 'room-list/:houseId', component: RoomListComponent, canActivate: [ByAuthenticatedUserGuard] },
  { path: 'sensor-list/:roomId', component: SensorListComponent, canActivate: [ByAuthenticatedUserGuard] },
  { path: 'sensor-value-table/:sensorId', component: SensorValueTableComponent, canActivate: [ByAuthenticatedUserGuard] },
  { path: 'sensor-value-chart/:sensorId', component: SensorValueChartComponent, canActivate: [ByAuthenticatedUserGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }