/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Authentication Service - auth.service.ts
*/

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";

@Injectable()
export class AuthService
{
    user: User;
    users: User[];

    constructor(private datasource: RestDataSource)
    {
        this.user = new User();
        datasource.getUsers().subscribe(data => {
            this.users=data;});
    }

    //Authenticate An Existing User
    authenticate(user: User): Observable<any>
    {
        return this.datasource.authenticate(user);
    }

    //Creates Authentication for a New User
    authenticateRegister(user: User): Observable<any>
    {
        return this.datasource.authenticateRegister(user);
    }

    //Allows Modification of User Date -- Still Need To Work on That
    modifyUser(user: User): Observable<any>
    {
        return this.datasource.modifyUser(user);
    }

    //Returns Sepecific User based on Id -- Still Need to work on that
    getUser(id: string): User
    {
        return this.users.find(u => u._id === id) as User;
    }

    //Stores User Data
    storeUserData(token: any, user: User): void
    {
        this.datasource.storeUserData(token, user);
    }

    //Returns True is User is Authenticated
    get authenticated(): boolean
    {
        return this.datasource.loggedIn();
    }

    //Logs the User Out
    logout(): Observable<any>
    {
        return this.datasource.logout();
    }
}
