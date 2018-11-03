import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CkeditorService } from '../services/ckeditor.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  formUploadImage = new FormGroup({
    file: new FormControl(null, Validators.required)
  });


  constructor(
    private ckeditorService: CkeditorService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.ckeditorService.init();
  }

}
