import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolsComponent } from './tools/tools.component';
import { UrlInputComponent } from './tools/url-input/url-input.component';
import { LoaderComponent } from './loader/loader.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { UsernameInputComponent } from './tools/url-input/username-input/username-input.component';
import { CollageComponent } from './visualizer/collage/collage.component';

import { ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    UrlInputComponent,
    LoaderComponent,
    VisualizerComponent,
    ScoreboardComponent,
    UsernameInputComponent,
    CollageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ ConfigService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
