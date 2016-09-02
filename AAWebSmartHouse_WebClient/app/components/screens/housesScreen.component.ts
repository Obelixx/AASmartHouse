import { Component } from '@angular/core';

import { HouseModel } from '../../models/house.model';

import { HouseService } from '../../services/house.service';
import { ScreenService } from '../../services/screen.service';

import { RoomsScreenComponent } from './roomsScreen.component';

@Component({
    selector: 'housesScreen',
    templateUrl: './app/components/screens/templates/housesScreen.component.template.html'
})
export class HousesScreenComponent {
    houses: [HouseModel] = [new HouseModel('1', '1', '1', 'desc', [1, 2, 3])];
    message = '';
    page = 1;

    constructor(
        private houseService: HouseService,
        private screenService: ScreenService
    ) {
        this.houses.splice(0);
        this.getHouses(this.page);
    }

    getHouses(page: number) {
        this.houses.splice(0);
        this.houseService.getHouses(page)
            .subscribe((res) => {
                if (Array.isArray(res)) {
                    this.houses = res;
                    this.message = 'Success';
                } else {
                    this.message = res;
                }
            })
    }

    previousClicked() {
        if (this.page > 1) {
            this.page--;
            this.getHouses(this.page);
        }
    }

    nextClicked() {
        if (this.page < this.houseService.pagesCount) {
            this.page++;
            this.getHouses(this.page);
        }
    }

    roomsClicked(houseIndex){
        this.houseService.selectedHouse = this.houses[houseIndex];
        this.screenService.toScreen(RoomsScreenComponent);
    }
}