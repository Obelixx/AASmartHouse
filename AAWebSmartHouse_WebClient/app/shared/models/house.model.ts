export class HouseModel {
    HouseId: any;
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

    public static get emptyHouse(){
      return new HouseModel('houseId','houseName','houseLocation','houseDescription',['']);
    }
}