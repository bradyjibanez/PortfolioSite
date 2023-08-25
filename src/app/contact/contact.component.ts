import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SmtpService } from '../_services';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  message_form = new FormControl('');
  copy_email: Boolean = false;
  email_sent: Boolean = false;
  email_failed: Boolean = false;
  message: string;

  constructor(private smtp_service: SmtpService) {}

  ngOnInit() {
  }

  onSubmission(message_data, event) {
  	let name = message_data._directives[0].value;
  	let email = message_data._directives[1].value;
  	let body = message_data._directives[2].value;
    let message = {"name": name, "from": email, "body": body};
    this.smtp_service.sendEmail(message).pipe(first()).subscribe(
        data => {
          this.emailSent();
        },
        error => {
          this.emailFailed();
        }
      );
  }

  copyEmail() {
  	let email = "bradyjibanez@gmail.com";
  	let copy_value = document.createElement("textarea");
  	document.body.appendChild(copy_value);
  	copy_value.value = email;
  	copy_value.select();
  	let success = document.execCommand('copy');
  	copy_value.remove();
  	if (success) {
      this.message  = "You now have a copy of my email on your clipboard!";
  		this.copy_email = true;
  		window.setTimeout(() => {
  			this.copy_email = false;
  		}, 5000);
  	} else {
  		this.message = "There was an issue copying my email to your clipboard...please use the form below to get in touch with me!";
  		this.copy_email = true;
  		window.setTimeout(() => {
  			this.copy_email = false;
  		}, 5000);		
  	}
    window.location.href = "mailto:bradyjibanez@gmail.com";
  }  

  emailSent() {
    this.message = "Your message is in my inbox...I'll get back to you as soon as I can!";
    this.email_sent = true;
    window.setTimeout(() => {
      this.email_sent = false;
    }, 5000);
  }    

  emailFailed() {
    this.message = "Well this doesn't look good, but there was an error sending your message...please take a copy of my email address and message me.";    
    this.email_failed = true;
    window.setTimeout(() => {
      this.email_failed = false;
    }, 5000);
  }    

}
