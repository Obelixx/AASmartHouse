import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserMetadataService } from '../../../shared/services/usermetadata.service';
import { SensorService } from '../../services/sensor.service';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../../shared/models/index';

@Component({
  selector: 'sensor-list',
  templateUrl: '/app/sensor/components/sensor-list/sensor-list.component.html'
})
export class SensorListComponent {
  constructor(private route: ActivatedRoute,private router: Router, private user: UserMetadataService, private service: SensorService) {
    this.service.roomId = this.route.snapshot.params['roomId'];
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

  sensorClickedTable(sensor:SensorModel){
    this.router.navigate(["sensor-value-table", sensor.SensorId]);
  }

  sensorClickedChart(sensor:SensorModel){
    this.router.navigate(["sensor-value-chart", sensor.SensorId]);
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
