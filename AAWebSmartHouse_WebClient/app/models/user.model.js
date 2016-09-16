"use strict";
var UserModel = (function () {
    function UserModel(FirstName, LastName, EMail, UserName, Id, PhoneNumber, RoleIds, HousesIds) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.EMail = EMail;
        this.UserName = UserName;
        this.Id = Id;
        this.PhoneNumber = PhoneNumber;
        this.RoleIds = RoleIds;
        this.HousesIds = HousesIds;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map