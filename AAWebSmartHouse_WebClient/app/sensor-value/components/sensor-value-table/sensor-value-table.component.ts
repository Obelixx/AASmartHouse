import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserMetadataService } from '../../../shared/services/usermetadata.service';
import { SensorValueService } from '../../services/sensor-value.service';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../../shared/models/index';

@Component({
  selector: 'sensor-value-table',
  templateUrl: '/app/sensor-value/components/sensor-value-table/sensor-value-table.component.html'
})
export class SensorValueTableComponent {
  constructor(private route: ActivatedRoute, private router: Router, private user: UserMetadataService, private service: SensorValueService) {
    this.service.sensorId = this.route.snapshot.params['sensorId'];
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

  aggregationTypes() {
    return Object.keys(AggregationType).slice(Object.keys(AggregationType).length / 2);;
  }

  aggregationTypeChange(aggregationType: string) {
    this.service.aggregationType = AggregationType[aggregationType];
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