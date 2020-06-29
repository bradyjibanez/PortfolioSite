import { Component, OnInit, Input } from '@angular/core';

import { MessageService } from '../../_services';

@Component({
  selector: 'project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent implements OnInit {

  @Input() project: any;
  project_image: string = '../../assets/comingsoon.png'; 
  mouse_in: Boolean = false;
  logo: string = "standard"
  ignore: Boolean= false;

  constructor(private message_service: MessageService) { }

  ngOnInit() {
    if (this.project['Image'] === "true") {
      let project_title = this.project['Title'].replace(/\s/g, "");
      this.project_image = '../../assets/'+project_title+'.png';
    }
  }

  learnMore(event) {
    if (this.project && event) {
      this.message_service.sendMessage("project_selected", this.project)
    }
  }

  alternateClass(ignore: any) {
    if (ignore !== "ignore") {
      this.ignore = ignore;
    }
    if (!this.ignore) {
      if (this.logo === "standard") {
        this.logo = "hover";
      } else {
        this.logo = "standard";
      }
     }
   }
}
