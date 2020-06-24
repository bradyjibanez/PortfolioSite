import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'projects-collection',
  templateUrl: './projects-collection.component.html',
  styleUrls: ['./projects-collection.component.css']
})
export class ProjectsCollectionComponent implements OnInit {

  @Input() projects: Object = {};

  constructor() { }

  ngOnInit() {
  }

}
