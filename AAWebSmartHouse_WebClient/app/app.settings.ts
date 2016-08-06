export class AppSettings {
    public static get UserServiceSettings() {
        return {
            usernameKeyName: "asdu",
            passwordKeyName: "asdp",
            tokenKeyName: 'Token',
            api: {
                Url: 'http://localhost:51934',
            },
            register: {
                Url: '/api/Account/Register',
            },
            token: {
                Url: '/api/Account/GetToken',
            },
            user: {
                Method: "Get",
                Url: '/api/User',
                InfoUrl: '/api/Account/UserInfo',
            },
            logout: {
                Url: '/api/Account/Logout',
            },
        }
    };

    public static get ScreenServiceSettings() {
        return {
            numberOfScreensToKeep: 4,
        }
    };

}