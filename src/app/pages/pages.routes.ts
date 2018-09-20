import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



const pagesRoutes: Routes = [
    { path: '',
    component: PagesComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { title: 'Barras de progreso' } },
        { path: 'graficas1', component: Graficas1Component, data: { title: 'Graficos 1' } },
        { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
        { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Cuenta de usuario' } },
        { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ] },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
