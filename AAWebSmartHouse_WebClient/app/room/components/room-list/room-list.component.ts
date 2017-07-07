import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserMetadataService } from '../../../shared/services/usermetadata.service';
import { RoomService } from '../../services/room.service';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../../shared/models/index';

@Component({
  selector: 'room-list',
  templateUrl: '/app/room/components/room-list/room-list.component.html'
})
export class RoomListComponent {
  constructor(private route: ActivatedRoute,private router: Router, private user: UserMetadataService, private service: RoomService) {
    this.service.houseId = this.route.snapshot.params['houseId'];
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

  roomClicked(room:RoomModel){
    this.router.navigate(["sensor-list", room.RoomId])
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
