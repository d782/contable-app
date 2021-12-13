import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  subs:Subscription= new Subscription;
  login:FormGroup=new FormGroup({});
  cargando:boolean=false;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private store:Store<AppState>) { }

  ngOnInit(): void {
    this.login=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });

    this.subs=this.store.select('ui').subscribe(ui=>{
      this.cargando=ui.isLoading;
    })
  }

  loginUser(form: FormGroup){
    if(form.invalid){return}

    this.store.dispatch(isLoading())
    let {email,password}=form.value;
    this.auth.login(email,password)
    .then(data=>{
      console.log(data)
      this.store.dispatch(stopLoading())
      this.router.navigate([''])
    }).catch(err=>{
      console.log(err)
      this.store.dispatch(stopLoading())
    });
    
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();      
  }
}
