import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.router';
import { DataoperationsService } from './dataoperations.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NewpageComponent } from './newpage/newpage.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NewpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MaterializeModule,
    HttpModule,
    FormsModule,
    routes
  ],
  providers: [DataoperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
