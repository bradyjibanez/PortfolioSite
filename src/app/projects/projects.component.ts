import { Component, OnInit, HostListener } from '@angular/core';
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
  project_selected: JSON = null;
  background_img: string = 'query.png';
  background_img_path: string;

  constructor(private message_service: MessageService) { }

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

  @HostListener('click')
  learnMore() {
	this.message_service.getMessage().subscribe(message => {
	  if (message) {
	    if (message.subject === "project_selected" && message.body !== null) {
	    	this.project_selected = message.body;
        this.background_img_path = '../../assets/'+this.project_selected['ID']+'/'+this.background_img;
	      }
	    }
    });    
    this.clicked = true;
    if (!this.dont_refresh) {
      this.ignore = true;
    } else {
      this.ignore = false;
      this.dont_refresh = !this.dont_refresh;
    }
  }

  @HostListener('document:click')
  dontLearnMore() {
    if (this.clicked && !this.ignore) {
      this.clicked = false;
      this.project_selected = null;
    } else {
      this.ignore = false;
    }
  }

  closeModal() {
    if (this.clicked && !this.ignore) {
      this.clicked = false;
      this.dont_refresh = true;
      this.project_selected = null;
    } else {
      this.ignore = false;
    }
  }

  nextModalImg() {
    if (this.background_img === "query.png") {
      this.background_img = 'response.png';
    }
    else if (this.background_img === "response.png") {
      this.background_img = "result.png"
    }
    else if (this.background_img === "result.png") {
     this.background_img = "query.png";
    }
    this.background_img_path = '../../assets/'+this.project_selected['ID']+'/'+this.background_img;
  }

  prevModalImg() {
    if (this.background_img === "query.png") {
      this.background_img = 'result.png';
    }
    else if (this.background_img === "result.png") {
      this.background_img = "response.png"
    }
    else if (this.background_img === "response.png") {
     this.background_img = "query.png";
    }
    this.background_img_path = '../../assets/'+this.project_selected['ID']+'/'+this.background_img;
  }  

  getImage() {
    return "url("+this.background_img_path+")";
  }

}
