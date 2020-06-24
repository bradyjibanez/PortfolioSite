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

}
