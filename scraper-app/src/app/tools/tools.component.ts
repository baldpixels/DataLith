import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tool } from '../tool';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  animations: [
    trigger('toolDetails', [
      state('inactive', style({
        top: '-150px',
        width: '0',
        height: '0'
      })),
      state('active', style({
        top: '-16px',
        width: '50%',
        height: 'auto'
      })),
      transition('inactive => active', animate('300ms ease-in-out')),
      transition('active => inactive', animate('300ms ease-in-out'))
    ]),
    trigger('toolImage', [
      state('inactive', style({
        width: '100%'
      })),
      state('active', style({
        width: '90%',
        filter: 'invert(1)'
      })),
      transition('inactive => active', animate('300ms ease-in-out')),
      transition('active => inactive', animate('300ms ease-in-out'))
    ])
  ]
})
export class ToolsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() onUrlSubmit = new EventEmitter<String>();
  @Output() onUsernameSubmit = new EventEmitter<String>();
  @Output() onToolAction = new EventEmitter<Tool>();
  @Input() toolIsChosen: boolean;

  @Input() tools: Tool[];
  @Input() chosenTool: Tool;

  hideAllDetails() {
    for(var i=0; i<this.tools.length; i++) {
      this.tools[i].hideDetails();
    }
  }

  unsetAllImages() {
    for(var i=0; i<this.tools.length; i++) {
      this.tools[i].unsetImage();
    }
  }

  chooseTool(selectedTool) {
    this.chosenTool = selectedTool;
    this.toolIsChosen = true;
  }

  toolAction(submittedUrl) {
    this.onUrlSubmit.emit(submittedUrl);
    this.onToolAction.emit(this.chosenTool);
  }

  sendUsername(submittedUsername) {
    this.onUsernameSubmit.emit(submittedUsername);
  }
}
