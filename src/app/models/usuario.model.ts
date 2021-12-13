export class usuario{

    static fromFirebase({email,uid,nombre}:any) {
        return new usuario(uid,nombre,email);
    }

    constructor(
        public uid:string,
        public nombre: string,
        public email:string,
    ){
        
    }
}