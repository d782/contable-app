import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import 'firebase/firestore';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription:Subscription=new Subscription;

  constructor(public auth: AngularFireAuth,
              private db: AngularFirestore,
              private store:Store<AppState>) { }

  initAuthlistener(){
    this.auth.authState.subscribe(fuser=>{
      if(fuser){
        this.userSubscription= this.db.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe(userData=>{
          const user=usuario.fromFirebase(userData);

          this.store.dispatch(setUser({user}))
        })

        
      }
      else{
          this.userSubscription.unsubscribe();
          this.store.dispatch(unSetUser());
      }
      
    })
  }

  crearUsuario(nombre:string,email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
    .then(({user})=>{
      const newUser=new usuario(user?.uid as string, nombre, user?.email as string)

      return this.db.doc(`${user?.uid}/usuario`).set({...newUser})
    });
  }
  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }
  logout(){
    return this.auth.signOut();
  }
  isAuth(){
    return this.auth.authState.pipe(map(fuser=>fuser!=null?true:false));
  }
}
