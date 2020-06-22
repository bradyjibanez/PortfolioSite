import { Component, OnInit, Input } from '@angular/core';

import { MessageService } from '../../_services';

@Component({
  selector: 'project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent implements OnInit {

  @Input()
  project: JSON;
  project_image: string = '../../assets/comingsoon.jpg'; 
  mouse_in: Boolean = false;

  constructor(private message_service: MessageService) { }

  ngOnInit() {
    if (this.project['Image'] === "true") {
      let project_title = this.project['Title'].replace(/\s/g, "");
      this.project_image = '../../assets/'+project_title+'.png';
    }
  }

  learnMore() {
    if (this.project) {
      this.message_service.sendMessage("project_selected", this.project)
    }
  }

}
