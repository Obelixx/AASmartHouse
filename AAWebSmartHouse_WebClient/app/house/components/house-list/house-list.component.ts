import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { UserMetadataService } from '../../../shared/services/usermetadata.service';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../../shared/models/index';

@Component({
  selector: 'house-list',
  templateUrl: '/app/house/components/house-list/house-list.component.html'
})
export class HouseListComponent {
  constructor(private user: UserMetadataService, private router: Router, private service: HouseService) {
  }

  onPage(pageNumber: number) {
    this.service.pageNumber = pageNumber;
  }

  nextPage() {
    if (this.service.pageNumber < this.service.pages.length) {
      this.service.pageNumber += 1;
    }
  }

  prevPage() {
    if (this.service.pageNumber > 1) {
      this.service.pageNumber -= 1;
    }
  }

  houseClicked(house: HouseModel) {
    this.router.navigate(["room-list", house.HouseId])
  }

  isPageVisible(page: number): boolean {
    if (this.service.pages.length <= 10) {
      return true;
    } else {
      if (
        page == 1 ||
        page == 2 ||
        page == this.service.pages.length - 1 ||
        page == this.service.pages.length ||
        page == this.service.pageNumber - 2 ||
        page == this.service.pageNumber - 1 ||
        page == this.service.pageNumber ||
        page == this.service.pageNumber + 1 ||
        page == this.service.pageNumber + 2) {
        return true;
      }
      return false;
    }
  }

  isPageNearVisible(page: number): boolean {
    if (this.service.pages.length <= 10) {
      return false;
    } else {
      if (
        page != 1 &&
        page != 2 &&
        page != this.service.pages.length - 1 &&
        page != this.service.pages.length &&
        (page == this.service.pageNumber - 3 ||
          page == this.service.pageNumber + 3)) {
        return true;
      }
      return false;
    }
  }
}
