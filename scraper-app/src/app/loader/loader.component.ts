import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.submitRequestToCrawler();
  }

  @Input() toolType;
  @Input() urlString;
  @Input() username;
  @Output() onDoneLoading = new EventEmitter<String>();

  crawlData = {};

  finishedLoading(data) {
    this.onDoneLoading.emit(data);
  }

  saveData(data) {
    if( data['error'] == null ) {
      if( this.toolType == 'Handaxe' ) {
        this.crawlData = {
          url: data['url'],
          brokenRatio: data['brokenRatio'],
          top5: data['top5']
        }
        this.finishedLoading(this.crawlData);
      }
      else if( this.toolType == 'Hook' ) {
        this.crawlData = {
          url: data['url'],
          meanTime: data['meanTime'],
          top5: data['top5']
        }
        this.finishedLoading(this.crawlData);
      }
      else {
        this.crawlData = {
          url: data['url'],
          images: data['images']
        }
        this.finishedLoading(this.crawlData);
      }
    }
    else {
      // URL was bad
      alert('Sorry, our crawler returned an error. Maybe try a different URL?')
    }
  }

  submitRequestToCrawler() {
    this.configService.getJson(this.urlString, this.toolType, this.username)
      .subscribe(
        data => {
          this.saveData(data);
        },
        err => console.error(err),
        () => console.log('done crawling.')
      );
  }

}
