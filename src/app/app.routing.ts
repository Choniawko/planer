import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserList } from './users/components/user-list';
import { UserEdit } from './users/components/user-edit';
import { Login } from './login/login';


const routes: Routes = [
  { path: '',                 component: HomeComponent },
  { path: 'home',             component: HomeComponent },
  { path: 'users',            component: UserList },
  { path: 'user-add',         component: UserEdit },
  { path: 'login',            component: Login }
];

export const routing = RouterModule.forRoot(routes);
