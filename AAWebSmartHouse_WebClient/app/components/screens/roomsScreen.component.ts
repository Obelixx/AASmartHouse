import { Component } from '@angular/core';

import { RoomModel } from '../../models/room.model';

import { RoomService } from '../../services/room.service';
import { HouseService } from '../../services/house.service';
import { ScreenService } from '../../services/screen.service';

import { SensorsScreenComponent } from './sensorsScreen.component';

@Component({
    selector: 'roomsScreen',
    templateUrl: './app/components/screens/templates/roomsScreen.component.template.html'
})
export class RoomsScreenComponent {
    rooms: RoomModel[] = [new RoomModel(1, "room", "et. 4", [1, 1, 1])]
    message = '';
    page = 1;

    constructor(
        private roomService: RoomService,
        private houseService: HouseService,
        private screenService: ScreenService
    ) {
        this.rooms.splice(0);
        this.getRooms(this.page);
    }

    getRooms(page: number) {
        this.rooms.splice(0);
        this.roomService.getRooms(this.houseService.selectedHouse.HouseId, page)
            .subscribe((res) => {
                if (Array.isArray(res)) {
                    this.rooms = res;
                    this.message = 'Success';
                    if(this.rooms.length == 0){
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
            this.getRooms(this.page);
        }
    }

    nextClicked() {
        if (this.page < this.roomService.pagesCount) {
            this.page++;
            this.getRooms(this.page);
        }
    }

    sensorsClicked(sensorIndex) {
        this.roomService.selectedRoom = this.rooms[sensorIndex];
        if(this.roomService.selectedRoom.SensorsIds.length > 0){
            this.screenService.toScreen(SensorsScreenComponent);
        }
    }
}