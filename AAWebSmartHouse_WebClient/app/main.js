"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./components/app.component');
var http_1 = require('@angular/http');
var user_service_1 = require('./services/user.service');
var localStorage_service_1 = require('./services/localStorage.service');
var screen_service_1 = require('./services/screen.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    user_service_1.UserService,
    localStorage_service_1.LocalStorageService,
    screen_service_1.ScreenService
]);
//# sourceMappingURL=main.js.map