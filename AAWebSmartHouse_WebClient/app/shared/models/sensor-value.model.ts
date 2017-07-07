export class SensorValueModel {
  SensorValueId: any;
  SensorId: any;
  Value: string;
  SensorValueDateTime: Date;

  constructor(SensorValueId: any, SensorId: any, Value: string, SensorValueDateTime: Date) {
    this.SensorValueId = SensorValueId;
    this.SensorId = SensorId;
    this.Value = Value;
    this.SensorValueDateTime = SensorValueDateTime;
  }

  public static get emptySensor() {
    return new SensorValueModel('sensorValueId', 'sensorId', "0", new Date('2016-12-08T14:00:00'));
  }
}