import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CKEditorModule  } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { BrowserComponent } from './browser/browser.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';

const routesConfig: Routes = [
  { path: '', component: CkeditorComponent },
  { path: 'browser/img', component: BrowserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    CkeditorComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    FormsModule,
    RouterModule.forRoot(routesConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
