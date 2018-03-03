import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserMetadataService } from '../../../shared/services/usermetadata.service';
import { SensorValueService } from '../../services/sensor-value.service';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../../shared/models/index';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'sensor-value-chart',
  templateUrl: '/app/sensor-value/components/sensor-value-chart/sensor-value-chart.component.html'
})
export class SensorValueChartComponent {


  public lineChartData: any = {
    chartType: 'LineChart',
    width: 1300,
    height: 900,
    dataTable: [
      ['Time', 'Values'],
      ['Time', 1],
    ],
    options: { title: "Title" },
  };

  constructor(private route: ActivatedRoute, private router: Router, private user: UserMetadataService, private service: SensorValueService) {
    this.service.sensorId = this.route.snapshot.params['sensorId'];

    this.service.onUserSensorValuesChanged.subscribe(
      (newValues: SensorValueModel[]) => {
        let newChartData: any = {
          chartType: 'LineChart',
          dataTable: [
            ['Time', this.service.sensor.SensorName],
            ['time', -10.2],
          ],
          options: {
            'legend': 'none',
            height: (window.screen.height)*0.50,
            //width: (window.screen.width),
            title: this.service.sensor.SensorDescription,
            chartArea: {
              top: 20,
              height: '50%'
            },
            axis:'Discrete',
            hAxis: {
              title: 'Time'
            },
            vAxis: {
              title: "Value [" + this.service.sensor.SensorUnits + "]"
            },
          },

        }

        newChartData.dataTable.splice(1);

        newValues.forEach(
          (value) => {

            newChartData.dataTable.push(
              [new Date(value.SensorValueDateTime).toLocaleString(), parseFloat(value.Value)]
            );
          }
        );

        this.lineChartData = newChartData;
      }
    );
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

  orderChange(option: string) {
    switch (option) {
      case "Descending":
        this.service.orderAscendingByDate = false;
        break;
      case "Ascending":
        this.service.orderAscendingByDate = true;        
        break;
      default:
        this.service.orderAscendingByDate = false;      
        break;
    }
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