import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() crawlData;
  @Input() toolType;

}
