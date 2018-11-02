import { Component, OnInit } from '@angular/core';
import { test2 } from '../../assets/javascript/demo2';


@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    test2();
  }

}
