export class SensorValueModel {
    SensorValueId: any;
    SensorId: any;
    Value: number;
    SensorValueDateTime: string;

    constructor(SensorValueId: any, SensorId: any, Value: number, SensorValueDateTime: string) {
        this.SensorValueId = SensorValueId;
        this.SensorId = SensorId;
        this.Value = Value;
        this.SensorValueDateTime = SensorValueDateTime;
    }
}