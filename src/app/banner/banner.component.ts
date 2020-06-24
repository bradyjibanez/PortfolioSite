import { Component, 
         OnInit } from '@angular/core';
import { Router }  from '@angular/router';

import { MessageService } from '../_services';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  home: Boolean;

  constructor(private message_service: MessageService,
              private router: Router){
  }

  ngOnInit() {
    let home_promise;
    this.message_service.getMessage().subscribe(message => {
      if (message) {
        if (message.subject === "home") {
          this.home = true;
          this.scrollBannerOut()            
          window.scrollTo(0, document.getElementById('bannerimgcontainer').offsetHeight);
        }
        if (message.subject === "!home") {
          this.home = false;
          this.scrollBannerUp()            
        }
      }
    });
  }

  scrollBannerOut() {
    let banner = document.getElementById('bannerimgcontainer')
    banner.style.setProperty('display', 'block')
    let scroll_banner_out = window.setInterval(function() {
      let position = window.pageYOffset;
      if (position > 0) {
        window.scrollTo(0, position-12);
      } else {
        window.clearInterval(scroll_banner_out);
        let banner = document.getElementById('bannerimgcontainer')
      }
    }, 0.0001);
    return true
  }

  scrollBannerUp() {
    let scroll_banner_up = window.setInterval(function() {
      let position = window.pageYOffset;
      if (position < document.getElementById('bannerimgcontainer').offsetHeight) {
        window.scrollTo(0, position+12);
      } else {
        window.clearInterval(scroll_banner_up);
        let banner = document.getElementById('bannerimgcontainer')
        banner.style.setProperty('display', 'none')
        window.scrollTo(0, 0);
      }
    }, 0.0001);
    return true
  }

}
