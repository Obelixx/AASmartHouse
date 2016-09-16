export class SensorModel {
    SensorId: string;
    SensorName: string;
    SensorDescription: string;
    SensorUnits: string;
    RoomId: any;

    constructor(SensorId: any, SensorName: string, SensorDescription: string, SensorUnits: string, RoomId: any) {
        this.SensorId = SensorId;
        this.SensorName = SensorName;
        this.SensorDescription = SensorDescription;
        this.SensorUnits = SensorUnits;
        this.RoomId = RoomId;
    }
}