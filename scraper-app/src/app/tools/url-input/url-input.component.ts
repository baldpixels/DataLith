import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UrlInput } from '../../url-input';
import { Tool } from '../../tool';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() chosenTool: Tool;
  @Output() onUrlSubmit = new EventEmitter<String>();
  @Output() onUsernameSubmit = new EventEmitter<String>();

  submittedUrl: String;
  submittedUsername: String;

  sendUrl(urlInput) {
    if(urlInput != '') {
      this.submittedUrl = urlInput;
      this.onUrlSubmit.emit(this.submittedUrl);
    }
    else {
      alert('Please actually enter a URL.')
    }
  }

  sendUsername(usernameInput) {
    this.submittedUsername = usernameInput;
    this.onUsernameSubmit.emit(this.submittedUsername);
  }

}
