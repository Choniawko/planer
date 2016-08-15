export class User {
    name: string;
    password: string;
    admin: boolean;
    email: string;
    firstname: string;
    lastname: string;
    
    constructor(user) {
        this.name = user.name;
        this.password = user.password;
        this.admin = user.admin;
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
    }
}