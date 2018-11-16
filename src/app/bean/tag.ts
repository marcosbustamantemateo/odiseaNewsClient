import { Articulo } from './articulo';
import { Categoria } from './categoria';

export class Tag {

    idTag: number;
    articuloTag: Articulo;
    categoriaTag: Categoria;

    constructor (idTag: number, articuloTag: Articulo, categoriaTag: Categoria) {

        this.idTag = idTag;
        this.articuloTag = articuloTag;
        this.categoriaTag = categoriaTag;
    }

}
