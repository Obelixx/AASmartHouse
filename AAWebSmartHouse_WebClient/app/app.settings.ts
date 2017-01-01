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
            },
            rooms:{
                Url: 'api/Room', // api/Room?houseId=houseId&page=1&pageSize=10
            },
            sensors:{
                Url: 'api/Sensor', // api/Sensor?roomId=roomId&page=1&pageSize=10
            },
            sensorValues:{
                Url: 'api/SensorValue', // GET api/SensorData?sensorId=sensorId&aggregationType=ByHour/ByDay/ByWeek/ByMonth&page=1&pageSize=10
            }
        }
    };

    public static get ScreenServiceSettings() {
        return {
            numberOfScreensToKeep: 4,
        }
    };

}

export enum SensorDataAggregationType{
    ByHour,
    ByDay,
    ByWeek,
    ByMonth,
}