import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NewpageComponent } from './newpage/newpage.component';

export const router: Routes = [
	{ path: "index", component: IndexComponent },
	{ path: "newpage", component: NewpageComponent },
	{ path: "newpage/:name", component: NewpageComponent },
    { path: "", redirectTo: "index", pathMatch: "full" }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);