"use strict";
var SensorModel = (function () {
    // SensorDataIdsByDays: [any];
    // SensorDataIdsByWeeks: [any];
    // SensorDataIdsByMonths: [any];
    function SensorModel(SensorId, SensorName, SensorDescription, SensorUnits, RoomId, SensorValuesIds) {
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
    return SensorModel;
}());
exports.SensorModel = SensorModel;
//# sourceMappingURL=sensor.model.js.map