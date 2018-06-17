import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface IMobileControlChange {
  code: string;
}

@Component({
  selector: 'fys-mobile-controls',
  templateUrl: './mobile-controls.component.html',
  styleUrls: ['./mobile-controls.component.scss']
})
export class MobileControlsComponent implements OnInit {

  @Output() change = new EventEmitter<IMobileControlChange>();

  constructor() { }

  onChange(change: IMobileControlChange) {
    this.change.emit(change);
  }

}
