export class HouseModel {
    HouseId: string;
    HouseName: string;
    HouseLocation: string;
    HouseDescription: string;
    RoomIds: [any];

    constructor(HouseId: any, HouseName: string, HouseLocation: string, HouseDescription: string, RoomIds: [any]) {
        this.HouseId = HouseId;
        this.HouseName = HouseName;
        this.HouseLocation = HouseLocation;
        this.HouseDescription = HouseDescription;
        this.RoomIds = RoomIds;
    }
}