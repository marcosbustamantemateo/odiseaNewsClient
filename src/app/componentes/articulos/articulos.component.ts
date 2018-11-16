import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Articulo } from '../../bean/articulo';
import { listadoArticulosMasVisitadosQuery, ListadoArticulosMasVisitadosQueryResponse } from '../../constantes/grahpql';
import { listadoTagsPorCategoriaQuery, ListadoTagsPorCategoriaQueryResponse } from '../../constantes/grahpql';
import { getCategoriaByIdQuery, GetCategoriaByIdQueryResponse } from '../../constantes/grahpql';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Tag } from '../../bean/tag';
import swall from 'sweetalert2';
import { Categoria } from '../../bean/categoria';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html'
})
export class ArticulosComponent implements OnInit, OnDestroy {

  listadoArticulos: Articulo[];
  listadoTags: Tag[];
  loading: boolean;
  categoria: Categoria;
  masVisitados: string;
  idCategoria: any;

  constructor(private apollo: Apollo, private _route: ActivatedRoute, private _router: Router) {

    this.loading = false;
    this.listadoArticulos = [];
    this.listadoTags = [];
    this.categoria = new Categoria(-1, '', new Uint8Array());
  }

  ngOnInit () {

    this._route.params.forEach((params: Params) => {

      this.masVisitados = sessionStorage.getItem('masVisitados'); // Cookie.get('masVisitados');
      this.idCategoria = sessionStorage.getItem('idCategoria'); // Cookie.get('idCategoria');

      if (this.masVisitados !== null) {
        this.getArticulosPorVisitas();
      }

      if (this.idCategoria != null) {

        this.getArticulosPorCategoria(this.idCategoria);
        this.getCategoriaById();
      }

    });
  }

  ngOnDestroy(): void {

    // Cookie.delete('idCategoria');
    sessionStorage.removeItem('idCategoria');
  }

  getArticulosPorVisitas () {

    this.apollo.query({query: listadoArticulosMasVisitadosQuery})
    .subscribe((response) => {

      if (response == null) {

        swall({
          type: 'error',
          title: 'Error de respuesta',
          text: 'No hay respuesta del servidor',
          footer: '',
        });
      } else {

        this.loading = response.loading;
        this.listadoArticulos = response.data['listadoArticulosPorVisitas'];
      }

    }, error => {

      swall({
        type: 'error',
        title: 'Error',
        text: 'Ha habido un error',
        footer: '',
      });
    }
   );

  }

  getCategoriaById () {
    this.apollo.query({query: getCategoriaByIdQuery, variables: {idCategoria: this.idCategoria}})
    .subscribe((response) => {

      if (response == null) {

        swall({
          type: 'error',
          title: 'Error de respuesta',
          text: 'No hay respuesta del servidor',
          footer: '',
        });
      } else {

        this.loading = response.loading;
        this.categoria = response.data['getCategoriaById'];
      }

    }, error => {

      swall({
        type: 'error',
        title: 'Error',
        text: 'Ha habido un error',
        footer: '',
      });
    }
   );
  }

  getArticulosPorCategoria (valorIdCategoria: number) {

    this.apollo.query({query: listadoTagsPorCategoriaQuery, variables: {idCategoria: valorIdCategoria}})
    .subscribe((response) => {

      if (response == null) {

        swall({
          type: 'error',
          title: 'Error de respuesta',
          text: 'No hay respuesta del servidor',
          footer: '',
        });
      } else {

        this.loading = response.loading;
        this.listadoTags = response.data['listadoTagsPorCategoria'];
      }

    }, error => {

      swall({
        type: 'error',
        title: 'Error',
        text: 'Ha habido un error',
        footer: '',
      });
    }
   );

  }

}
