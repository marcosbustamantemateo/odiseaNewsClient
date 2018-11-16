export class Categoria {

    idCategoria: number;
    nombre: string;
    imagen: Uint8Array;
    url: any;

    constructor (idCategoria: number, nombre: string, imagen: Uint8Array) {

        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.imagen = imagen;
        this.url = '';
    }

}
