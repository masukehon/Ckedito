import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { test1 } from '../../assets/javascript/demo';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  formUploadImage = new FormGroup({
    file: new FormControl(null, Validators.required)
  });


  constructor(private uploadService: UploadService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    test1();
  }

  onFileChanged(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formUploadImage.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  submit() {
    console.log('234234');
    // this.uploadService.create(this.formUploadImage.value)
    //   .then(() => console.log('ok'))
    //   .catch(error => console.log(error));
  }

}
