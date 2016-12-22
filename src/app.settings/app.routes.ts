import { Routes } from '@angular/router';
import { HomeComponent } from '../home.component/home.component';
import { NotFoundComponent } from '../notfound.component/notfound.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    // add routes here
    { path: '**', component: NotFoundComponent }
];
