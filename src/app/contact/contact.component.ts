import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { visibility, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    trigger('fade', [
    	state('void', style ({ opacity: 1})),
    	transition(':enter, :leave',[
    		animate(2000)
    	])
   	])
  ]
})
export class ContactComponent implements OnInit {

	feedbackForm: FormGroup;
	//data model
	feedback: Feedback;
	feedbackcopy = null;
	contacttype = ContactType;
	submitted: boolean;
	errMess: string;
	
	formErrors = {
		'firstname': '',
		'lastname': '',
		'telnum': '',
		'email': ''
	};

	validationMessages = {
		'firstname': {
		'required': 'First name is required',
		'minlength': 'First name should be at least 2 characters long',
		'maxlength': 'First name should be less than 25 characters long',
		},
		'lastname': {
			'required': 'Last name is required',
			'minlength': 'Last name should be at least 2 characters long',
			'maxlength': 'Last name should be less than 25 characters long',
		},
		'telnum': {
			'required': 'Tel. number is required',
			'pattern': 'Tel. number must contain only numbers'
		},
		'email': {
			'required': 'Email is required',
			'email': 'Email is not in a valid format'
		}

	};

	constructor(private fb: FormBuilder,
				private feedbackservice: FeedbackService, 
				@Inject('BaseURL') private BaseURL) { 
		this.createForm();
	}

	ngOnInit() {
		// this.feedbackservice.getOneFeedback()
		// 			.subscribe(feedback => { 
		//       		this.feedbackcopy = feedback;
		//       	});

	}

	createForm(): void {
		this.feedbackForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
			lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
			telnum: ['', [Validators.required, Validators.pattern]],
			email: ['', [Validators.required, Validators.email]],
			agree: false,
			contacttype: 'None',
			message: ''
		});

		this.feedbackForm.valueChanges
	      .subscribe(data => this.onValueChanged(data));

	    this.onValueChanged(); // (re)set validation messages now

	  }

	onValueChanged(data?: any) {
	    if (!this.feedbackForm) { 
	    	return; 
	    }
	    const form = this.feedbackForm;
	    for (const field in this.formErrors) {
	      // clear previous error message (if any)
	      this.formErrors[field] = '';
	      const control = form.get(field);
	      if (control && control.dirty && !control.valid) {
	        const messages = this.validationMessages[field];
	        for (const key in control.errors) {
	          this.formErrors[field] += messages[key] + ' ';
	        }
	      }
	    }
	}
	submittedFun() {
		setTimeout (
		this.submitted = true, 5000);
		this.submitted = false;
	}
	onSubmit() {
		this.feedback = this.feedbackForm.value;
		// console.log(this.feedbackcopy);
		// this.feedbackcopy.push({
		// 	firstname: this.feedback['firstname'],
		// 	lastname: this.feedback['lastname'],
		// 	telnum: this.feedback['telnum'],
		// 	email: this.feedback['email'],
		// 	agree: this.feedback['agree'],
		// 	contacttype: this.feedback['contacttype'],
		// 	message: this.feedback['message']
		// });

		// console.log('Copy: ', this.feedbackcopy);
		// console.log('Original: ', this.feedback);
		// this.feedbackcopy.save()
		// 				.subscribe(feedback => this.feedback = feedback);
		
		this.feedbackservice.submitFeedback(this.feedback)
						.subscribe(feedback => this.feedback = feedback);
		
		
		setTimeout(feedback => this.feedback = feedback, 5000);				

		// console.log(this.feedbackcopy);
		this.feedbackForm.reset({
			firstname: '',
			lastname: '',
			telnum: '',
			email: '',
			agree: false,
			contacttype: 'None',
			message: ''
		});
	}
}
