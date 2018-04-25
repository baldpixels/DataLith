import { Component } from '@angular/core';

import { Tool } from './tool';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataLith';

  tools = [
    new Tool(0, 'Handaxe'),
    new Tool(1, 'Hook'),
    new Tool(2, 'Grindstone')
  ];

  choosingTool = true;
  toolIsChosen = false;
  loadingResults = false;
  dataReady = false;

  chosenTool: Tool;

  toolType: String;
  urlString: String;
  username: String;

  crawlData = {};

  returnToToolSelect() {
    this.choosingTool = true;
    this.toolIsChosen = false;
    this.loadingResults = false;
    this.dataReady = false;
  }

  returnToUrlSubmit() {
    this.choosingTool = true;
    this.toolIsChosen = true;
    for(var i=0; i<this.tools.length; i++) {
      if (this.tools[i].name === this.toolType) {
        this.chosenTool = this.tools[i];
      }
    }
    this.loadingResults = false;
    this.dataReady = false;
  }

  storeUrl(urlInput) {
    this.urlString = urlInput;
  }

  storeUsername(usernameInput) {
    this.username = usernameInput;
  }

  submitAction(toolUsed) {
    this.toolType = toolUsed.name;
    this.choosingTool = false;
    this.loadingResults = true;
  }

  displayResults(data) {
    this.loadingResults = false;
    this.dataReady = true;
    this.crawlData = data;
    console.log(data);
  }
}
