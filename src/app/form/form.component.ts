import { Component, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, EmailValidator, AbstractControl } from '@angular/forms';
import { User } from 'src/app/user';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  fromGroup: FormGroup;
  @Output() change = new EventEmitter

  constructor(private formBuild:FormBuilder) { }

  
  


  ngOnInit(){
    this.fromGroup = this.formBuild.group({
      firstName: ['',[Validators.required]],
      lastname:['',[Validators.minLength(3),Validators.required]],
      email:['',[Validators.email]],
      age:['22',[Validators.min(0),Validators.max(99)]]
    })  
  }
  EmailValidator(control, AbstractControl){
    const value = control.value
    if (value && value.includes('@')){
      return null;
    }
    return {
      email : {
        acturl: true
      }
    }
  }
  onSubmit(form: FormGroup){
    console.log(form.valid, form.invalid);
    console.log((<FormControl>form.get('firstName')).errors);
    const {firstName, lastname,email,age} = form.value;
    const user = new User(firstName, lastname,email,age);
    console.log(user);
  }
}