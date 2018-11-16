import { Usuario } from './usuario';

export class Articulo {

    idArticulo: number;
    titulo: string;
    imagen: Uint8Array;
    descripcion: string;
    contenido: string;
    numVisitas: number;
    usuarioAdmin: Usuario;

    constructor (idArticulo: number, titulo: string, imagen: Uint8Array, descripcion: string, contenido: string,
                numVisitas: number, usuarioAdmin: Usuario) {

        this.idArticulo = idArticulo;
        this.titulo = titulo;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.contenido = contenido;
        this.numVisitas = numVisitas;
        this.usuarioAdmin = usuarioAdmin;
    }
}
