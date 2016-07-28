"use strict";
var AppSettings = (function () {
    function AppSettings() {
    }
    Object.defineProperty(AppSettings, "UserServiceSettings", {
        get: function () {
            return {
                tokenKeyName: 'Token',
                apiUrl: 'http://localhost:51934',
                registerUrl: '/api/Account/Register',
                tokenUrl: '/api/Account/GetToken',
                userInfoUrl: '/api/Account/UserInfo',
                userUrl: '/api/User',
                logoutUrl: '/api/Account/Logout',
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
//# sourceMappingURL=app.settings.js.map