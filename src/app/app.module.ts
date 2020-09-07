import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatFormFieldModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LiveDataComponent } from './live-data/live-data.component';
import { HistoryDataComponent } from './history-data/history-data.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register.component';
import { LoginComponent } from './user/login.component';
import { ActivateGuard } from './common/activate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LiveDataComponent,
    HistoryDataComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,//.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent },
      { path: 'history', component: HistoryDataComponent, canActivate:[ActivateGuard]},
      { path: 'live', component: LiveDataComponent, canActivate:[ActivateGuard] },
      { path:'', redirectTo: '/home', pathMatch: 'full'}
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
