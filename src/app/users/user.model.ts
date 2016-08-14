export class User {
    name: string;
    password: string;
    admin: boolean;
    
    constructor(user) {
        this.name = user.name;
        this.password = user.password;
        this.admin = user.admin;
    }
}