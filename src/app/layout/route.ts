
import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { MangaComponent } from '../pages/manga/manga.component';
import { ProfileComponent } from '../pages/profile/profile.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    }, 
    {
        path: 'article/:id',
        component: MangaComponent

    },
    {
        path: 'article/:id/:page',
        component: MangaComponent
    },
    {
        path: 'profile/:id',
        component: ProfileComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
