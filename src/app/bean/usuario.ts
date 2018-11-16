export class Usuario {

    idUsuario: number;
    nombre: string;
    apellidos: string;
    edad: number;
    email: string;
    login: string;
    password: string;
    enabled: boolean;
    uid: string;

    constructor(idUsuario: number, nombre: string, apellidos: string, edad: number, email: string, login: string, password: string,
                enabled: boolean, uid: string) {

        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.email = email;
        this.login = login;
        this.password = password;
        this.enabled = enabled;
        this.uid = uid;
    }
}
