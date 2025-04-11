import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'board', component: BoardComponent, canActivate: [authGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];
