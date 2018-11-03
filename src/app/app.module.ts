import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { BrowserComponent } from './browser/browser.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';

import { RequestService } from './services/request.service';
import { UploadService } from './services/upload.service';
import { CkeditorService } from './services/ckeditor.service';

const routesConfig: Routes = [
  { path: '', component: CkeditorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    CkeditorComponent
  ],
  imports: [
    HttpModule,
    ReactiveFormsModule,
    BrowserModule,
    CKEditorModule,
    FormsModule,
    RouterModule.forRoot(routesConfig)
  ],
  providers: [RequestService, UploadService, CkeditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
