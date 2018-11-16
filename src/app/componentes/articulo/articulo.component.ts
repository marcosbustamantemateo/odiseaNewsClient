import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Articulo } from '../../bean/articulo';
import { Usuario } from '../../bean/usuario';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { getArticuloByIdQuery, GetArticuloByIdQueryResponse } from '../../constantes/grahpql';
import { listadoComentariosPorArticuloQuery, ListadoComentariosPorArticuloQueryResponse } from '../../constantes/grahpql';
import { listadoCategoriasPorArticuloQuery, ListadoCategoriasPorArticuloQueryResponse } from '../../constantes/grahpql';
import { aumentarNumVisitasQuery, AumentarNumVisitasQueryResponse } from '../../constantes/grahpql';
import { borraComentarioQuery, BorraComentarioQueryResponse } from '../../constantes/grahpql';
import { creaComentarioQuery, CreaComentarioQueryResponse } from '../../constantes/grahpql';
import { Comentario } from '../../bean/comentario';
import { Categoria } from '../../bean/categoria';
import { DomSanitizer } from '@angular/platform-browser';
import swall from 'sweetalert2';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html'
})
export class ArticuloComponent implements OnInit {

  articulo: Articulo;
  loading: boolean;
  idArticulo: number;
  listadoComentarios: Comentario[];
  listadoCategorias: Categoria[];
  respuesta: string;
  logueado: any;
  idUsuario: any;
  url: any;

  constructor(private apollo: Apollo, private _route: ActivatedRoute, private _router: Router, private domSanitizer: DomSanitizer) {

    this.loading = false;
    this.articulo = new Articulo(-1, '', new Uint8Array(), '', '', -1, new Usuario(-1, '', '', -1, '', '', '', false, ''));
    this.listadoComentarios = [];
    this.listadoCategorias = [];
    this.respuesta = '';
    this.logueado = '';
    this.idUsuario = '';
   }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {

      this.idArticulo = params['idArticulo'];
      this.logueado = sessionStorage.getItem('logueado'); // Cookie.get('logueado');
      this.idUsuario = sessionStorage.getItem('usuario'); // Cookie.get('usuario');

      if (this.idArticulo !== null) {

        this.getArticulo(this.idArticulo);
        this.getsComentarioArticulo(this.idArticulo);
        this.getsCategoriaArticulo(this.idArticulo);
        this.aumentaNumVisitas(this.idArticulo);
      }

    });
  }

  getArticulo (idArticulo: number) {

    this.apollo.query({query: getArticuloByIdQuery, variables: {idArticulo: idArticulo}})
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
        this.articulo = response.data['getArticuloById'];

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

  getsComentarioArticulo (idArticulo: number) {

    this.apollo.query({query: listadoComentariosPorArticuloQuery, variables: {idArticulo: idArticulo}})
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
        this.listadoComentarios = response.data['listadoComentariosPorArticulo'];
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

  getsCategoriaArticulo (idArticulo: number) {

    this.apollo.query({query: listadoCategoriasPorArticuloQuery, variables: {idArticulo: idArticulo}})
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
        this.listadoCategorias = response.data['listadoCategoriasPorArticulo'];
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

  comentar () {

    if (this.logueado !== null) {

      const contenido = (<HTMLInputElement> document.getElementById('contenido')).value;

      if (contenido !== '') {

          this.apollo.query({query: creaComentarioQuery, variables: {contenido: contenido, idArticulo: this.idArticulo,
            idUsuario: this.idUsuario}})
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
              this.respuesta = response.data['creaComentario'];

              if (this.respuesta !== null) {
                  if (this.respuesta === 'ERROR') {

                    swall({
                      type: 'error',
                      title: 'Comentario ya existente',
                      text: 'No repita los comentarios',
                      footer: '',
                    });
                  } else {
                    swall({
                      title: 'Comentando',
                      text: '',
                      timer: 500,
                      onOpen: () => {
                        swall.showLoading();
                      }
                    }).then((result) => {
                      if (
                        result.dismiss === swall.DismissReason.timer
                      ) {
                        location.reload();
                      }
                    });
                  }

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
      } else {
        swall({
          type: 'error',
          title: 'Error de validación',
          text: 'El comentario no puede estar vacio',
          footer: '',
        });
      }
    } else {
      swall({
        type: 'error',
        title: 'Error',
        text: 'Debe iniciar sesión para poder comentar',
        footer: '',
      });
    }


  }

  borraComentario (idComentario: number) {

    console.log(idComentario);

    swall({
      title: 'Confirmación de borrado',
      text: '¿Estas seguro de borrar el comentario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.apollo.query({query: borraComentarioQuery, variables: {idComentario: idComentario}})
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
            this.respuesta = response.data['borraComentario'];

            if (this.respuesta !== null) {
              swall({
                title: 'Borrando comentario',
                text: '',
                timer: 500,
                onOpen: () => {
                  swall.showLoading();
                }
              }).then((result) => {
                if (result.dismiss === swall.DismissReason.timer) {
                  window.location.reload();
                }
              });
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
    });
  }

  aumentaNumVisitas (idArticulo: number) {

    this.apollo.query({query: aumentarNumVisitasQuery, variables: {idArticulo: idArticulo}})
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
        this.respuesta = response.data['aumentarNumVisitas'];
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
