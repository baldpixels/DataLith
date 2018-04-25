import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css']
})
export class CollageComponent implements OnInit {

  constructor() { }

  images = [];
  @Input() crawlData;

  ngOnInit() {
    this.loadCollage();
  }

  loadCollage() {
    for(var i=0; i<this.crawlData['images'].length; i++) {
      this.images.push(
        {
        link: this.crawlData['images'][i]
        }
      );
    }
  }

  randomWidth() {
    return (Math.random()*75 + 25).toString() + 'px';
  }

  randomX() {
    return (Math.random()*100).toString() + '%';
  }

  randomY() {
    return (Math.random()*100).toString() + '%';
  }

}
