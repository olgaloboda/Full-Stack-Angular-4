import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

	dish: Dish;
	dishcopy = null;
	dishIds: number[];
	prev: number;
	next: number;
	commentForm: FormGroup;
	comment: Comment;

	formErrors = {
		'author': '',
		'comment': ''
	};
	errMess: string;


	validationMessages = {
		'author': {
			'required': 'Name is required',
			'minlength': 'Name should be at least 2 characters long'
		},
		'comment': {
			'required': 'Comment is required',
			'minlength': 'Comment should be at leat 2 characters long'
		}
	};

	constructor(private dishservice: DishService, 
				private route: ActivatedRoute,
				private location: Location,
				private fb: FormBuilder,
				@Inject('BaseURL') private BaseURL) { 
		this.createForm();
	}

	ngOnInit() {
	    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
	    this.route.params
	      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
	      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id)},
	      	errmess => this.errMess = <any>errmess);
	}

	setPrevNext(dishId: number) {
		let index = this.dishIds.indexOf(dishId);
		this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
		// console.log(this.dishIds.length, index, this.prev);
		this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
	}

	goBack(): void {
		this.location.back();
	}


	createForm(): void {
		this.commentForm = this.fb.group({
			author: ['', [Validators.required, Validators.minLength(2)]],
			rating: '',
			comment: ['', [Validators.required, Validators.minLength(2)]]
		});

		this.commentForm.valueChanges
			.subscribe(data => this.onValueChanged(data));

		this.onValueChanged();
	}

	onValueChanged(data?:any) {
		if (!this.commentForm) {
			return;
		}
		const comment = this.commentForm;
		for (const field in this.formErrors) {
			this.formErrors[field] = '';
			const control = comment.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	onSubmit() {
		this.comment = this.commentForm.value;
		const date: Date = new Date();
		this.dishcopy.comments.push({
			rating: this.comment['rating'], 
			comment: this.comment['comment'], 
			author: this.comment['author'],
			date: date.toISOString()
		});
		this.dishcopy.save()
					 .subscribe(dish => this.dish = dish);
	
		console.log(this.dish.comments);
		this.commentForm.reset ({
			author: '',
			rating: 5,
			comment: ''
		});
	}

}
