import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { test1 } from '../../assets/javascript/demo';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  formUploadImage = new FormGroup({
    flFileUpload: new FormControl('')
  });
  images = [];

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    test1();
  }

  submit() {
    this.uploadService.create(this.formUploadImage.value)
      .then(() => console.log('ok'))
      .catch(error => console.log(error));
  }

}
