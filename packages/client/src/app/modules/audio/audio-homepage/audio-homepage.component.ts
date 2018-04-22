import { Component, OnInit } from '@angular/core';
import {ITracks, tracks} from '../tracks';

@Component({
  selector: 'fys-audio-homepage',
  templateUrl: './audio-homepage.component.html',
  styleUrls: ['./audio-homepage.component.scss']
})
export class AudioHomepageComponent implements OnInit {

  constructor() { }

  public tracks: ITracks[] = tracks;

  ngOnInit() {
  }

}
