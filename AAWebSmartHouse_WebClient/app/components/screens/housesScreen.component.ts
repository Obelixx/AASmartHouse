import { Component } from '@angular/core';

import { HouseModel } from '../../models/house.model';

import { HouseService } from '../../services/house.service';

@Component({
    selector: 'housesScreen',
    templateUrl: './app/components/screens/templates/housesScreen.component.template.html'
})
export class HousesScreenComponent {
    houses: [HouseModel] = [new HouseModel('1', '1', '1', 'desc', [1, 2, 3])];
    message = '';
    page = 1;

    constructor(private houseService: HouseService) {
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
        // TODO: Get somehow maxPages??
        // Maybe return houses count to user profile!?
        this.page++;
        this.getHouses(this.page);
    }
}