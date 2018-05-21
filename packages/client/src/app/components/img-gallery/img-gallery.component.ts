import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { fadeInOut } from '../../animations';

@Component({
  selector: 'fys-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss'],
  animations: [ fadeInOut ]
})
export class ImgGalleryComponent implements OnInit, OnDestroy {

  @Input() images: string[];

  public currentImage: string;

  public previousImage: string;

  public currentIndex = 0;

  public intervalId;

  ngOnInit(): void {

    const setImg = () => {

      this.previousImage = this.currentImage || this.images[this.currentIndex];

      // We will ensure element doesnt render when this is null, so we can fade it in
      //
      this.currentImage = null;

      setTimeout(() => {
        // this will make our img element fade in the view
        //
        this.currentImage = this.images[this.currentIndex];
      }, 300);

      if ( this.currentIndex === this.images.length - 1 ) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }

    };

    setImg();

    this.intervalId = setInterval(setImg, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
