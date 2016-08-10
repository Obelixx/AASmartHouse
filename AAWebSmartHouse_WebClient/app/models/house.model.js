"use strict";
var HouseModel = (function () {
    function HouseModel(HouseId, HouseName, HouseLocation, HouseDescription, RoomIds) {
        this.HouseId = HouseId;
        this.HouseName = HouseName;
        this.HouseLocation = HouseLocation;
        this.HouseDescription = HouseDescription;
        this.RoomIds = RoomIds;
    }
    return HouseModel;
}());
exports.HouseModel = HouseModel;
//# sourceMappingURL=house.model.js.map