export class AppSettings {
    public static get UserServiceSettings() {
        return {
            usernameKeyName: "asdu",
            passwordKeyName: "asdp",
            tokenKeyName: 'Token',
            apiUrl: 'http://localhost:51934',
            registerUrl: '/api/Account/Register',
            tokenUrl: '/api/Account/GetToken',
            userInfoUrl: '/api/Account/UserInfo',
            userUrl: '/api/User',
            logoutUrl: '/api/Account/Logout',
        }
    };

    public static get ScreenServiceSettings(){
       return {
           numberOfScreensToKeep: 4,
       }
    };

}