import { Component, OnInit, ViewChild } from '@angular/core';
import * as Projects from '../../assets/projects.json';

import { MessageService } from '../_services';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  live_projects = [];
  local_projects = [];
  // Booleans heirarchy required for multi modal object selection and interaction
  // master decider for modal init
  clicked: Boolean;
  // needed to decide when modal destroy is warranted
  ignore: Boolean;
  // override ignore inside modal for internal modal destroy icon
  dont_refresh: Boolean = false;
  iframe: Boolean = false;
  iframe2: Boolean = false;
  project_selected: JSON = null;
  background_img: string = 'query.png';
  background_img_path: string;

  constructor(private message_service: MessageService) {}

  ngOnInit() {
    let count = 1;
    for (let project of Projects['Projects']) {
      if (project['Type'] === "Live") {
        this.live_projects.push(project);
        count++;
      }
      if (project['Type'] === "Local") {
        this.local_projects.push(project);
        count++;
      }    
    }
  }

  learnMore(ignore_because_open: Boolean = false) {
  	this.message_service.getMessage().subscribe(message => {
  	  if (message) {
  	    if (message.subject === "project_selected" && message.body !== null) {
  	    	this.project_selected = message.body;
          this.background_img_path = '../../assets/'+this.project_selected['ID']+'/'+this.background_img;
  	    }
  	  }
    });    
    this.clicked = true;
    if (this.project_selected['ID'] === "EPICIoT") {
      this.iframe = true;
    }
    if (!this.dont_refresh) {
      this.ignore = true;
    } else {
      this.ignore = false;
      this.dont_refresh = !this.dont_refresh;
    }
  }

  dontLearnMore() {
    if (this.clicked && !this.ignore) {
      this.clicked = false;
      this.project_selected = null;
    } else {
      this.ignore = false;
    }
  }

  closeModal() {
    if (this.clicked) {
      this.clicked = false;
      this.project_selected = null;
      this.iframe = false;
      this.background_img = 'query.png';
    } else {
      this.ignore = false;
    }
  }

  nextModalImg() {
    if (this.background_img === "query.png") {
      if (this.project_selected['ID'] === "EPICIoT") {
        this.iframe = false;
        this.iframe2 = true;  
      }
      this.background_img = 'response.png';
    }
    else if (this.background_img === "response.png") {
      if (this.project_selected['ID'] === "EPICIoT") {
        this.iframe2 = false;
        this.iframe = false;  
      }      
      this.background_img = "result.png"
    }
    else if (this.background_img === "result.png") {
      if (this.project_selected['ID'] === "EPICIoT") {
        this.iframe = true; 
        this.iframe2 = false; 
      }      
     this.background_img = "query.png";
    }
    this.background_img_path = '../../assets/'+this.project_selected['ID']+'/'+this.background_img;
  }

  prevModalImg() {
    if (this.background_img === "query.png") {
      if (this.project_selected['ID'] === "EPICIoT") {
        this.iframe2 = false;
        this.iframe = false
      }
      this.background_img = 'result.png';
    }
    else if (this.background_img === "result.png") {
      if (this.project_selected['ID'] === "EPICIoT") {
        this.iframe2 = true;
        this.iframe = false;  
      }         
      this.background_img = "response.png"
    }
    else if (this.background_img === "response.png") {
      if (this.project_selected['ID'] === "EPICIoT") {
        this.iframe = true;
        this.iframe2 = false;
      }         
     this.background_img = "query.png";
    }
    this.background_img_path = '../../assets/'+this.project_selected['ID']+'/'+this.background_img;
  }  

  getImage() {
    if (!this.iframe) {
      return "url("+this.background_img_path+")";
    }
  }

}
