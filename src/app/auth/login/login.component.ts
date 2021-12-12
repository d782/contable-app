import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  login:FormGroup=new FormGroup({});

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.login=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  loginUser(form: FormGroup){
    if(form.invalid){return}
    let {email,password}=form.value;
    this.auth.login(email,password)
    .then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
    });
    this.router.navigate([''])
  }

}
