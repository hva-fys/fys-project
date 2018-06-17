import { Component, OnInit } from '@angular/core';
import { IVideo, videos } from '../video';

@Component({
  selector: 'fys-video-homepage',
  templateUrl: './video-homepage.component.html',
  styleUrls: ['./video-homepage.component.scss']
})
export class VideoHomepageComponent implements OnInit {

  public videos: IVideo[] = videos;

  constructor() { }

  ngOnInit() {
  }

}
