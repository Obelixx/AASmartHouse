export class UserModel {
    FirstName: string;
    LastName: string;
    EMail: string;
    UserName: string;
    Id: string;
    PhoneNumber: string;
    RoleIds: [any];
    HousesIds: [any];

    constructor(
        FirstName: any,
        LastName: string,
        EMail: string,
        UserName: string,
        Id: string,
        PhoneNumber:string,
        RoleIds: [any],
        HousesIds: [any]
    ) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.EMail = EMail;
        this.UserName = UserName;
        this.Id = Id;
        this.PhoneNumber = PhoneNumber;
        this.RoleIds = RoleIds;
        this.HousesIds = HousesIds;
    }
}