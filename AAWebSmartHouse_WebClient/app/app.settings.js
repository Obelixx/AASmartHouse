"use strict";
var AppSettings = (function () {
    function AppSettings() {
    }
    Object.defineProperty(AppSettings, "ApiSettings", {
        get: function () {
            return {
                elementsPerPage: 20,
                tokenKeyName: 'Token',
                api: {
                    Url: 'http://localhost:51934/',
                },
                register: {
                    Url: 'api/Account/Register',
                },
                token: {
                    Url: 'api/Account/GetToken',
                },
                user: {
                    Url: 'api/User',
                    InfoUrl: 'api/Account/UserInfo',
                    ChangePasswordUrl: 'api/Account/ChangePassword',
                },
                account: {
                    UserInfoUrl: 'api/Account/UserInfo',
                    ChangePasswordUrl: 'api/Account/ChangePassword',
                },
                groups: {
                    Url: 'api/Group',
                },
                logout: {
                    Url: 'api/Account/Logout',
                },
                houses: {
                    Url: 'api/House',
                },
                rooms: {
                    Url: 'api/Room',
                },
                sensors: {
                    Url: 'api/Sensor',
                },
                sensorValues: {
                    Url: 'api/SensorValue',
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppSettings, "ScreenServiceSettings", {
        get: function () {
            return {
                numberOfScreensToKeep: 4,
            };
        },
        enumerable: true,
        configurable: true
    });
    ;
    return AppSettings;
}());
exports.AppSettings = AppSettings;
(function (SensorDataAggregationType) {
    SensorDataAggregationType[SensorDataAggregationType["ByHour"] = 0] = "ByHour";
    SensorDataAggregationType[SensorDataAggregationType["ByDay"] = 1] = "ByDay";
    SensorDataAggregationType[SensorDataAggregationType["ByWeek"] = 2] = "ByWeek";
    SensorDataAggregationType[SensorDataAggregationType["ByMonth"] = 3] = "ByMonth";
})(exports.SensorDataAggregationType || (exports.SensorDataAggregationType = {}));
var SensorDataAggregationType = exports.SensorDataAggregationType;
//# sourceMappingURL=app.settings.js.map