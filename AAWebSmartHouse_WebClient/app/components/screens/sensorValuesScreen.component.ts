import { Component } from '@angular/core';

import { SensorValueModel } from '../../models/sensorValue.model';

import { SensorValueService } from '../../services/sensorValue.service';
import { SensorService } from '../../services/sensor.service';
import { ScreenService } from '../../services/screen.service';

import { SensorDataAggregationType } from '../../app.settings';


@Component({
    selector: 'sensorValuesScreen',
    templateUrl: './app/components/screens/templates/sensorValuesScreen.component.template.html'
})
export class SensorValuesScreenComponent {
    sensorData: SensorValueModel[] = [new SensorValueModel(1,1, 1, "Temp in kitchen")]
    message = '';
    sensorDataAggregationType: SensorDataAggregationType = SensorDataAggregationType.ByHour;
    page = 1;
    pages = this.sensorValueService.pagesCount(this.sensorDataAggregationType);

    constructor(
        private sensorValueService: SensorValueService,
        private sensorService: SensorService,
        private screenService: ScreenService
    ) {
        this.sensorData.splice(0);
        this.getSensorValues(this.page);
    }

    getSensorValues(page: number) {
        this.sensorData.splice(0);
        this.sensorValueService.getSensorValues(this.sensorService.selectedSensor.SensorId, this.sensorDataAggregationType, page)
            .subscribe((res) => {
                console.log(res);
                if (Array.isArray(res)) {
                    this.sensorData = res;
                    this.message = 'Success';
                    if(this.sensorData.length == 0){
                        this.message += '; But you have no data for this sensor!';
                    }
                } else {
                    this.message = res;
                }
            })
    }


    previousClicked() {
        if (this.page > 1) {
            this.page--;
            this.getSensorValues(this.page);
        }
    }

    nextClicked() {
        if (this.page <  this.sensorValueService.pagesCount(this.sensorDataAggregationType)) {
            this.page++;
            this.getSensorValues(this.page);
        }
    }

    //sensorValueClicked(sensorValueIndex) {
        //this.sensorValuesService.selectedSensor = this.sensors[sensorValueIndex];
        //this.sensors[sensorValueIndex].SensorId
            //this.screenService.toScreen(SensorsScreenComponent);
    //}
}