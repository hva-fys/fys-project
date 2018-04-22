import { Component, OnInit } from '@angular/core';

interface ICategoryTile {
  title: string;
  icon: string;
  description: string;
  route?: string;
}

@Component({
  selector: 'fys-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public categories: ICategoryTile[] = [
    { title: 'Taxfree Shop', icon: 'shop', description: this.loremText(), route: 'webshop'},
    { title: 'Gaming', icon: 'videogame_asset', description: this.loremText(), route: 'tic-tac-toe'},
    { title: 'Flight info', icon: 'my_location', description: this.loremText()},
    { title: 'Video', icon: 'video_library', description: `Entertain yourself with a monthly selection of videos`},
    { title: 'Audio', icon: 'audiotrack', description: this.loremText(), route: 'audio' }
  ];

  constructor() { }

  ngOnInit() { }

  public loremText() {
    return `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi repellendus placeat, fugit voluptate molestias distinctio
      at tenetur commodi veritatis tempora dolor beatae nostrum quasi, blanditiis non. Suscipit reprehenderit voluptas qui.`;
  }

}
