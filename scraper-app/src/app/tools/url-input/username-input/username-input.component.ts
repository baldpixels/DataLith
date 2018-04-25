import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css']
})
export class UsernameInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() onButtonClick = new EventEmitter<String>();

  sendUsername(submittedUsername) {
    if(submittedUsername != '') {
      this.onButtonClick.emit(submittedUsername);
    }
    else {
      alert('Please actually enter a username.')
    }
  }

}
