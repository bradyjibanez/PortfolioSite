import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ProjectsComponent } from './projects';
import { ContactComponent } from './contact';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'projects',
		component: ProjectsComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: '**',
		redirectTo: 'home'
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];

export const routing = RouterModule.forRoot(routes);