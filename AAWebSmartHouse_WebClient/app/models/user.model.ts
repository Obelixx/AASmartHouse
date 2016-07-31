export class UserModel {
    email;
    password;

    constructor(email = null, password = null) {
        this.email = email;
        this.password = password;
    }
}