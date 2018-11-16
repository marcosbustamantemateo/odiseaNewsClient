import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Articulo } from '../../bean/articulo';
import { listadoUsuariosQuery, ListadoUsuariosQueryResponse } from '../../constantes/grahpql';
import { listadoArticulosQuery, ListadoArticulosQueryResponse } from '../../constantes/grahpql';
import { ultimoArticuloQuery, UltimoArticuloQueryResponse } from '../../constantes/grahpql';
import { element } from 'protractor';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from '../../bean/usuario';
import swall from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articulo: Articulo;
  listadoArticulos: Articulo[];
  loading: boolean;
  url: any;

  constructor(private apollo: Apollo, private domSanitizer: DomSanitizer) {

    this.loading = false;
    this.listadoArticulos = [];
    this.articulo = new Articulo(-1, '', new Uint8Array(), '', '', -1, new Usuario(-1, '', '', -1, '', '', '', false, ''));
  }

  ngOnInit () {

    this.getsArticulos();
    this.getUltimoArticulo();
  }

  getUltimoArticulo () {

    this.apollo.query({query: ultimoArticuloQuery})
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
          this.articulo = response.data['ultimoArticulo'];

          this.url = this.domSanitizer.bypassSecurityTrustUrl('data:image/JPG;base64,' + this.articulo.imagen);
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

  getsArticulos () {

    this.apollo.query({query: listadoArticulosQuery})
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
          this.listadoArticulos = response.data['listadoArticulos'];
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

  masVisitados () {

    sessionStorage.removeItem('idCategoria'); // Cookie.delete('idCategoria');
    sessionStorage.setItem('masVisitados', 'true'); // Cookie.set('masVisitados', 'true');
    // location.reload();
  }

}
