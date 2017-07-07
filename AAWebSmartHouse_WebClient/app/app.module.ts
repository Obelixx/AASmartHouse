import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule, JsonpModule } from '@angular/http';

import { ByAuthenticatedUserGuard, ByUnauthenticatedUserGuard } from './shared/guards/index';
import { NotFoundModule } from './not-found/not-found.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { RoomModule } from './room/room.module';
import { SensorModule } from './sensor/sensor.module';
import { SensorValueModule } from './sensor-value/sensor-value.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    NotFoundModule,
    SharedModule,
    HomeModule,
    UserModule,
    HouseModule,
    RoomModule,
    SensorModule,
    SensorValueModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ByAuthenticatedUserGuard,
    ByUnauthenticatedUserGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
