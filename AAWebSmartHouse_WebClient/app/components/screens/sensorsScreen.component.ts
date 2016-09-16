import { Component } from '@angular/core';

import { SensorModel } from '../../models/sensor.model';

import { SensorService } from '../../services/sensor.service';
import { RoomService } from '../../services/room.service';
import { ScreenService } from '../../services/screen.service';

@Component({
    selector: 'sensorsScreen',
    templateUrl: './app/components/screens/templates/sensorsScreen.component.template.html'
})
export class SensorsScreenComponent {
    sensors: [SensorModel] = [new SensorModel(1, "temp1", "Temp in kitchen", "C",1)]
    message = '';
    page = 1;

    constructor(
        private sensorService: SensorService,
        private roomService: RoomService,
        private screenService: ScreenService
    ) {
        this.sensors.splice(0);
        this.getSensors(this.page);
    }

    getSensors(page: number) {
        this.sensors.splice(0);
        this.sensorService.getSensors(this.roomService.selectedRoom.RoomId, page)
            .subscribe((res) => {
                if (Array.isArray(res)) {
                    this.sensors = res;
                    this.message = 'Success';
                    if(this.sensors.length == 0){
                        this.message += '; But you have no rooms in this house!';
                    }
                } else {
                    this.message = res;
                }
            })
    }


    previousClicked() {
        if (this.page > 1) {
            this.page--;
            this.getSensors(this.page);
        }
    }

    nextClicked() {
        if (this.page < this.sensorService.pagesCount) {
            this.page++;
            this.getSensors(this.page);
        }
    }

    sensorDataClicked(sensorDataIndex) {
        this.sensorService.selectedSensor = this.sensors[sensorDataIndex];
        //this.sensors[sensorDataIndex].SensorId
            //this.screenService.toScreen(SensorsScreenComponent);
    }
}