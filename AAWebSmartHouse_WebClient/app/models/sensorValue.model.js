"use strict";
var SensorValueModel = (function () {
    function SensorValueModel(SensorValueId, SensorId, Value, SensorValueDateTime) {
        this.SensorValueId = SensorValueId;
        this.SensorId = SensorId;
        this.Value = Value;
        this.SensorValueDateTime = SensorValueDateTime;
    }
    return SensorValueModel;
}());
exports.SensorValueModel = SensorValueModel;
//# sourceMappingURL=sensorValue.model.js.map