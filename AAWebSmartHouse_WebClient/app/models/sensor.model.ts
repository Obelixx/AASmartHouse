export class SensorModel {
    SensorId: any;
    ControlerNumber: number;
    SensorName: string;
    SensorDescription: string;
    SensorUnits: string;
    Registerd: boolean;
    RoomId: any;
    SensorValuesIds: [any];
    // SensorDataIdsByDays: [any];
    // SensorDataIdsByWeeks: [any];
    // SensorDataIdsByMonths: [any];

    constructor(SensorId: any, SensorName: string, SensorDescription: string, SensorUnits: string, RoomId: any, SensorValuesIds: [any]){//, SensorDataIdsByDays: [any], SensorDataIdsByWeeks: [any], SensorDataIdsByMonths: [any]) {
        this.SensorId = SensorId;
        this.SensorName = SensorName;
        this.SensorDescription = SensorDescription;
        this.SensorUnits = SensorUnits;
        this.RoomId = RoomId;
        this.SensorValuesIds = SensorValuesIds;
        // this.SensorDataIdsByDays = SensorDataIdsByDays;
        // this.SensorDataIdsByWeeks = SensorDataIdsByWeeks;
        // this.SensorDataIdsByMonths = SensorDataIdsByMonths;
    }
}