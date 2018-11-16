import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Categoria } from '../../bean/categoria';
import { listadoTagsQuery, ListadoTagsQueryResponse } from '../../constantes/grahpql';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import swall from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {

  listadoCategorias: Categoria[];
  loading: boolean;
  url: any;

  constructor(private apollo: Apollo, private _route: ActivatedRoute, private _router: Router, private domSanitizer: DomSanitizer) {

    this.loading = false;
    this.listadoCategorias = [];
  }

  ngOnInit () {

      this.getCategorias();
  }

  getCategorias () {

    this.apollo.query({query: listadoTagsQuery})
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
        this.listadoCategorias = response.data['listadoCategorias'];

        for (const categoria of this.listadoCategorias) {

          categoria.url = this.domSanitizer.bypassSecurityTrustUrl('data:image/JPG;base64,' + categoria.imagen);
        }
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

  tags (idCategoria: any) {

    sessionStorage.setItem('idCategoria', idCategoria); // Cookie.set('idCategoria', idCategoria);
  }

}
