import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  //constructor(private regService: RegistrationService){}


  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  registrationHandler(){
   alert("The regisration service has not yet been created")
    // this.regService.registerUser(this.registrationForm.controls.username!, this.registrationForm.controls.password!)
  }
}
