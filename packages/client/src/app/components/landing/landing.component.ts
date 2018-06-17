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
    {
      title: 'Taxfree Shop', icon: 'shop',
      description: `Do you want to take advantage of your trip as much as possible? View our tax-free products here!`,
      route: 'webshop'
    },
    { title: 'Gaming', icon: 'videogame_asset',
      description: `Are you just staring at the clouds and do you want some variety? Test your gaming skills with one of our games.`,
      route: 'gaming'
    },
    { title: 'Flight info', icon: 'my_location',
      description: `Hold on tight, and enjoy the Flight! Track your flight with live information from the cockpit.`,
      route: 'flight-status'},
    { title: 'Video', icon: 'video_library',
      description: `Do you just settle down and laugh at a comedy? Or prefer to let time fly with watching an exciting thriller?`,
      route: 'video'
    },
    { title: 'Audio', icon: 'audiotrack',
      description: `Listen to music from our wide range and dream away while we take you to your destination.`,
      route: 'audio' }
  ];

  constructor() { }

  ngOnInit() { }

  public loremText() {
    return `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi repellendus placeat, fugit voluptate molestias distinctio
      at tenetur commodi veritatis tempora dolor beatae nostrum quasi, blanditiis non. Suscipit reprehenderit voluptas qui.`;
  }

}
