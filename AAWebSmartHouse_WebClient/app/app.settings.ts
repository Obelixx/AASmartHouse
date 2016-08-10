export class AppSettings {
    public static get ApiSettings() {
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
            houses:{
                Url: 'api/House', // ?page=XX&pageSize=20
            }
        }
    };

    public static get ScreenServiceSettings() {
        return {
            numberOfScreensToKeep: 4,
        }
    };

}