import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() crawlData;
  @Input() toolType;

}
