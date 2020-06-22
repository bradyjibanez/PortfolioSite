import { Component } from '@angular/core';
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
  banner_size: number;

  constructor(private message_service: MessageService,
              private router: Router){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && (event.url !== "/home" && event.url !== "/")){
        this.message_service.sendMessage("!home", null);
      } else if (event instanceof NavigationEnd && event.url === "/home") {
        this.message_service.sendMessage("home", null);
      } else if (event instanceof NavigationEnd && event.url === "/") {
        this.message_service.sendMessage("home", null);
      }
    });
  }
}
