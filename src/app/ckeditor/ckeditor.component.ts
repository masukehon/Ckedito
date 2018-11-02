import { Component, OnInit, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { test2 } from '../../assets/javascript/demo2';
import { test3 } from '../../assets/javascript/demo3';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CkeditorComponent implements OnInit, OnChanges {
  ckeditorTxt = '';
  constructor(private ref: ChangeDetectorRef) { }
  count = 0;

  ngOnInit() {
    test2((result, error) => {
      if (error) return console.log(error);
      this.ckeditorTxt = result;
      this.ref.detectChanges();
    });
  }

  ngOnChanges() {}

  submit() {
    
  }
}
