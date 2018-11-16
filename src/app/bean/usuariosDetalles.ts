import { Usuario } from './usuario';
import { Rol } from './rol';

export class UsuariosDetalles {

    idUsuariosDetalles: number;
    usuario: Usuario;
    rol: Rol;

    constructor (idUsuariosDetalles: number, usuario: Usuario, rol: Rol) {

        this.idUsuariosDetalles = idUsuariosDetalles;
        this.usuario = usuario;
        this.rol = rol;
    }

}
