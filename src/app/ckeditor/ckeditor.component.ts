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
  raw = '<p>abcd</p>';
  constructor(private ref: ChangeDetectorRef) { }
  tempt = `<p>hello</p>
  <p>
    <img alt=""
    src="http://localhost:4000/upload/1541148027912.jpg"
    style="height:300px; width:400px" />
  </p>
  <p>goodbye</p>`;

  ngOnInit() {
    test2((result, error) => {
      if (error) return console.log(error);
      this.ckeditorTxt = result;
      this.ref.detectChanges();
    });
  }

  ngOnChanges() { }

  load() {
    test3(this.tempt);
    this.ref.detectChanges();
  }
}
