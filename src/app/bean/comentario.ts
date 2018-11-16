import { Usuario } from './usuario';
import { Articulo } from './articulo';

export class Comentario {

    idComentario: number;
    contenido: string;
    usuarioEstandar: Usuario;
    articulo: Articulo;

    constructor (idComentario: number, contenido: string, usuarioEstandar: Usuario, articulo: Articulo) {

        this.idComentario = idComentario;
        this.contenido = contenido;
        this.usuarioEstandar = usuarioEstandar;
        this.articulo = articulo;
    }

    public get $idComentario(): number {
        return this.idComentario;
    }
    public get $contenido(): string {
        return this.contenido;
    }
    public get $usuarioEstandar(): Usuario {
        return this.usuarioEstandar;
    }
    public get $articulo(): Articulo {
        return this.articulo;
    }
    public set $idComentario(value: number) {
        this.idComentario = value;
    }
    public set $contenido(value: string) {
        this.contenido = value;
    }
    public set $usuarioEstandar(value: Usuario) {
        this.usuarioEstandar = value;
    }
    public set $articulo(value: Articulo) {
        this.articulo = value;
    }

}
