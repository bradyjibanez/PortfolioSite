import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'projects-collection',
  templateUrl: './projects-collection.component.html',
  styleUrls: ['./projects-collection.component.css']
})
export class ProjectsCollectionComponent implements OnInit {

  @Input() projects: Object = {};
  count: number = 0;
  project: Object;
  background_img: string = 'query.png';
  background_img_path: string;

  constructor() { }

  ngOnInit() {
  	this.project = this.projects[this.count];
    this.background_img_path = '../../assets/'+this.project['ID']+'/'+this.background_img;    
  }

  nextProjectImg() {
  	let project = this.projects[this.count];
    if (this.background_img === "query.png") {
      this.background_img = 'response.png';
    }
    else if (this.background_img === "response.png") {
      this.background_img = "result.png"
    }
    else if (this.background_img === "result.png") {
     this.background_img = "query.png";
    }
    this.background_img_path = '../../assets/'+project['ID']+'/'+this.background_img;
  }

  prevProjectImg() {
  	let project = this.projects[this.count];
    if (this.background_img === "query.png") {
      this.background_img = 'result.png';
    }
    else if (this.background_img === "result.png") {
      this.background_img = "response.png"
    }
    else if (this.background_img === "response.png") {
     this.background_img = "query.png";
    }
    this.background_img_path = '../../assets/'+project['ID']+'/'+this.background_img;
  }  

  getImage() {
    return "url("+this.background_img_path+")";
  }

  nextProj() {
  	if (this.count === Object.keys(this.projects).length-1) {
  		this.count = 0;
  	} else {
  		this.count++;
  	}
  	this.project = this.projects[this.count];  	
  }

  prevProj() {
  	if (this.count === 0) {
  		this.count = Object.keys(this.projects).length-1;
  	} else {
  		this.count--;
  	}
  	this.project = this.projects[this.count];  	
  }

}
