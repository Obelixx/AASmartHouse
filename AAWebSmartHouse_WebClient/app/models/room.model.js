"use strict";
var RoomModel = (function () {
    function RoomModel(RoomId, RoomName, RoomDescription, SensorsIds) {
        this.RoomId = RoomId;
        this.RoomName = RoomName;
        this.RoomDescription = RoomDescription;
        this.SensorsIds = SensorsIds;
    }
    return RoomModel;
}());
exports.RoomModel = RoomModel;
//# sourceMappingURL=room.model.js.map