export class RoomModel {
    RoomId: any;
    RoomName: string;
    RoomDescription: string;
    SensorsIds: [any];

    constructor(RoomId: any, RoomName: string, RoomDescription: string, SensorsIds: [any]) {
        this.RoomId = RoomId;
        this.RoomName = RoomName;
        this.RoomDescription = RoomDescription;
        this.SensorsIds = SensorsIds;
    }

    public static get emptyRoom(){
      return new RoomModel(0, "roomName", "RoomDescription", [''])
    }
}