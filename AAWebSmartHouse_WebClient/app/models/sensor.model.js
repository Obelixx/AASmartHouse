"use strict";
var SensorModel = (function () {
    function SensorModel(SensorId, SensorName, SensorDescription, SensorUnits, RoomId) {
        this.SensorId = SensorId;
        this.SensorName = SensorName;
        this.SensorDescription = SensorDescription;
        this.SensorUnits = SensorUnits;
        this.RoomId = RoomId;
    }
    return SensorModel;
}());
exports.SensorModel = SensorModel;
//# sourceMappingURL=sensor.model.js.map