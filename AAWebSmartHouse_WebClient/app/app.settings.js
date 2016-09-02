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
//# sourceMappingURL=app.settings.js.map