import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit,OnDestroy {
  cargando:boolean=false;
  subs:Subscription=new Subscription;
  registroForm: FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder, 
              private auth:AuthService,
              private router:Router,
              private store:Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm=this.fb.group({
      nombre:['',Validators.required],
      email:['',[Validators.required,Validators.email],],
      password:['',Validators.required]
    });
    this.subs=this.store.select('ui').subscribe(data=>{
      this.cargando=data.isLoading;
    });
  }
  registerUser(form: FormGroup){
    if(this.registroForm.invalid){return;}
    this.store.dispatch(isLoading())
    const {nombre,email,password}=form.value;

    this.auth.crearUsuario(nombre,email,password)
    .then(credentials=>{
      console.log(credentials)
      this.store.dispatch(stopLoading())
      this.router.navigate(['']);
    }).catch(err=>{
      this.store.dispatch(stopLoading())
      console.log(err);
    });

  }
  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
}
