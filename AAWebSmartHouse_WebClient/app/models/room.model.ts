export class RoomModel {
    RoomId: string;
    RoomName: string;
    RoomDescription: string;
    SensorsIds: [any];

    constructor(RoomId: any, RoomName: string, RoomDescription: string, SensorsIds: [any]) {
        this.RoomId = RoomId;
        this.RoomName = RoomName;
        this.RoomDescription = RoomDescription;
        this.SensorsIds = SensorsIds;
    }
}