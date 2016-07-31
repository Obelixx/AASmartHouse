"use strict";
var UserModel = (function () {
    function UserModel(email, password) {
        if (email === void 0) { email = null; }
        if (password === void 0) { password = null; }
        this.email = email;
        this.password = password;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map