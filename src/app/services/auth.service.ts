import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import {map} from 'rxjs/operators';
import { usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private db: AngularFirestore) { }

  initAuthlistener(){
    this.auth.authState.subscribe(fuser=>{
      console.log(fuser?.email)
      console.log(fuser?.uid)
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
