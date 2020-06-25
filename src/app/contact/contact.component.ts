import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  message_form = new FormControl('');
  copy_email: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmission(message_data, event) {
  	let name = message_data._directives[0].value;
  	let email = message_data._directives[1].value;
  	let message = message_data._directives[2].value;

  }

  async copyEmail() {
  	let email = "bradyjibanez@gmail.com";
	//await window.navigator.clipboard.writeText(email);
	this.copy_email = true;
	window.setTimeout(() => {
		this.copy_email = false;
	}, 5000);
  }

}
