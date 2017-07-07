export class SensorModel {
    SensorId: any;
    ControlerNumber: number;
    SensorName: string;
    SensorDescription: string;
    SensorUnits: string;
    Registerd: boolean;
    RoomId: any;
    SensorValuesIds: [any];

    constructor(SensorId: any, SensorName: string, SensorDescription: string, SensorUnits: string, RoomId: any, SensorValuesIds: [any]){
        this.SensorId = SensorId;
        this.SensorName = SensorName;
        this.SensorDescription = SensorDescription;
        this.SensorUnits = SensorUnits;
        this.RoomId = RoomId;
        this.SensorValuesIds = SensorValuesIds;
    }

    public static get emptySensor(){
      return new SensorModel(0, "[SensorName]", "[SensorDescription]", "[SensorUnits]",0,['']);
    }
}