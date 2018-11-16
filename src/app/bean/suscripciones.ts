import { Usuario } from './usuario';
import { Categoria } from './categoria';

export class Suscripcion {

    idSuscripcion: number;
    usuarioSuscriptor: Usuario;
    categoriaSuscrita: Categoria;

    constructor (idSuscripcion: number, usuarioSuscriptor: Usuario, categoriaSuscrita: Categoria) {

        this.idSuscripcion = idSuscripcion;
        this.usuarioSuscriptor = usuarioSuscriptor;
        this.categoriaSuscrita = categoriaSuscrita;
    }

}
