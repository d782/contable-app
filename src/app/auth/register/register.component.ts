import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.registroForm=this.fb.group({
      nombre:['',Validators.required],
      email:['',[Validators.required,Validators.email],],
      password:['',Validators.required]
    })
  }
  registerUser(form: FormGroup){
    if(this.registroForm.invalid){return;}

    const {nombre,email,password}=form.value;

    this.auth.crearUsuario(nombre,email,password)
    .then(credentials=>{
      console.log(credentials)
    }).catch(err=>{
      console.log(err);
    });
    this.router.navigate(['']);
  }
}
