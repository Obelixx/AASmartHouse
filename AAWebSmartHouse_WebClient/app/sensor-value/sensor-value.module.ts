import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FormsModule } from '@angular/forms';
import { SensorValueService } from './services/sensor-value.service';
import { SensorValueTableComponent } from './components/sensor-value-table/sensor-value-table.component';
import { SensorValueChartComponent } from './components/sensor-value-chart/sensor-value-chart.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    Ng2GoogleChartsModule
  ],
  declarations: [
    SensorValueTableComponent,
    SensorValueChartComponent,
  ],
  providers: [
    SensorValueService
  ]
})
export class SensorValueModule {

}