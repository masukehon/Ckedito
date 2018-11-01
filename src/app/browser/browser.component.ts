import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../services/upload.service';

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
    this.uploadService.getAll()
      .then(images => {
        this.images = images.map(img => 'http://localhost:4000/' + img.image);
      })
      .catch(error => console.log(error));
  }

  submit() {
    this.uploadService.create(this.formUploadImage.value)
      .then(() => console.log('ok'))
      .catch(error => console.log(error));
  }

}
