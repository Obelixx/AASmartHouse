import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FormsModule } from '@angular/forms';
import { SensorService } from './services/sensor.service';
import { SensorListComponent } from './components/sensor-list/sensor-list.component';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
  ],
  declarations: [
    SensorListComponent,
  ],
  providers: [
    SensorService
  ]
})
export class SensorModule {

}