import { Component, ViewChild } from '@angular/core';
import { Router, Event, NavigationEnd }  from '@angular/router';

import { MessageService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'BradyJIbanez';
  fixed: Boolean = false;
  home: Boolean;
  body_target: string = "body100";

  constructor(private message_service: MessageService,
              private router: Router){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && (event.url !== "/home" && event.url !== "/")){
        this.message_service.sendMessage("!home", null);
        this.home = false;
      } else if (event instanceof NavigationEnd && event.url === "/home") {
        this.message_service.sendMessage("home", null);
        this.home = true;
      } else if (event instanceof NavigationEnd && event.url === "/") {
        this.message_service.sendMessage("home", null);
        this.home = true;
      }
    });
    this.message_service.getMessage().subscribe((message) => {
      if (message && message.subject === "home") {
        window.setTimeout(() => {
          this.body_target = "body100";
        }, 650);
      }
      if (message && message.subject === "!home") {
        this.body_target = "bodyvh";
      }      
    })
  }
}
