import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Usuario } from '../../bean/usuario';
import swall from 'sweetalert2';
import { Router, Params } from '@angular/router';
import { getUsuarioByIdQuery, GetUsuarioByIdQueryResponse } from '../../constantes/grahpql';
import { actualizaUsuarioQuery, ActualizaUsuarioQueryResponse } from '../../constantes/grahpql';
import { getCategoriasSuscritasQuery, GetCategoriasSuscritasResponse } from '../../constantes/grahpql';
import { getCategoriasNoSuscritasQuery, GetCategoriasNoSuscritasResponse } from '../../constantes/grahpql';
import { creaSuscripcionQuery, CreaSuscripcionResponse } from '../../constantes/grahpql';
import { borraSuscripcionQuery, BorraSuscripcionResponse } from '../../constantes/grahpql';
import { borraUsuarioQuery, BorraUsuarioQueryResponse } from '../../constantes/grahpql';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Categoria } from '../../bean/categoria';
import { Suscripcion } from '../../bean/suscripciones';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  usuario2: Usuario;
  loading: boolean;
  idUsuario: any;
  listadoCategorias: Categoria[];
  listadoSuscripciones: Suscripcion[];
  listadoId: number[];
  respuesta: String;

  constructor(private apollo: Apollo, private router: Router) {

    this.loading = false;
    this.usuario = new Usuario(-1, '', '', -1, '', '', '', false, '');
    this.usuario2 = new Usuario(-1, '', '', -1, '', '', '', false, '');
    this.idUsuario = '';
    this.listadoCategorias = [];
    this.listadoSuscripciones = [];
    this.listadoId = [];
    this.respuesta = '';
  }

  ngOnInit() {

    this.idUsuario = sessionStorage.getItem('usuario'); // Cookie.get('usuario');

    if (this.idUsuario !== null) {

      this.getUsuarioById(this.idUsuario);
      this.getCategoriasSuscritas(this.idUsuario);
    } else {
      this.router.navigateByUrl('iniciarSesion');
    }
  }

  eliminaUsuario () {

    swall({
      title: 'Confirmación de borrado',
      text: '¿Estas seguro de borrar su cuenta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
      this.apollo.query({query: borraUsuarioQuery, variables: {idUsuario: this.idUsuario}})
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
          this.respuesta = response.data['eliminaUsuario'];

          if (this.respuesta !== null) {

            sessionStorage.clear(); // Cookie.deleteAll();
            location.reload();
            this.router.navigateByUrl('iniciarSesion');
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

  getCategoriasSuscritas (idUsuario: number) {

    this.apollo.query({query: getCategoriasSuscritasQuery, variables: {idUsuario: idUsuario}})
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
        this.listadoSuscripciones = response.data['getCategoriasSuscritas'];

        for (const suscripcion of this.listadoSuscripciones) {

          this.listadoId.push(suscripcion.categoriaSuscrita.idCategoria);
        }

        if (this.listadoId) {

          this.getsCategoriasNoSuscritas(this.listadoId);
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

  getsCategoriasNoSuscritas (listaIdCategoriasSuscritas: number[]) {

    this.apollo.query({query: getCategoriasNoSuscritasQuery, variables: {listaIdCategoriasSuscritas: listaIdCategoriasSuscritas}})
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
        this.listadoCategorias = response.data['getCategoriasNoSuscritas'];
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

  getUsuarioById (idUsuario: number) {

    this.apollo.query({query: getUsuarioByIdQuery, variables: {idUsuario: idUsuario}})
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
          this.usuario = response.data['getUsuarioById'];

          (<HTMLInputElement> document.getElementById('nombre')).value = this.usuario.nombre;
          (<HTMLInputElement> document.getElementById('apellidos')).value = this.usuario.apellidos;
          (<HTMLInputElement> document.getElementById('edad')).value = this.usuario.edad.toString();
          (<HTMLInputElement> document.getElementById('login')).value = this.usuario.login;
          (<HTMLInputElement> document.getElementById('email')).value = this.usuario.email;
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

  isValidEmail(mail: string): boolean {

    // tslint:disable-next-line:max-line-length
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail);
  }

  actualiza () {

    const nombre = (<HTMLInputElement> document.getElementById('nombre')).value;
    const apellidos = (<HTMLInputElement> document.getElementById('apellidos')).value;
    const edad = (<HTMLInputElement> document.getElementById('edad')).value;
    const login = (<HTMLInputElement> document.getElementById('login')).value;
    const email = (<HTMLInputElement> document.getElementById('email')).value;
    const password = (<HTMLInputElement> document.getElementById('password')).value;
    const password2 = (<HTMLInputElement> document.getElementById('password2')).value;

    if (nombre === '' || apellidos === '' || login === '' || email === '' || edad < '0'
        || password === '' || password2 === '' || edad.toString() === '' || !this.isValidEmail(email) ||
        password !== password2) {

        swall({
          type: 'error',
          title: 'Error de validación',
          text: 'Rellene los datos correctamente',
          footer: '',
        });
    } else {

      this.apollo.query({query: actualizaUsuarioQuery, variables: {idUsuario: this.idUsuario, nombre: nombre, apellidos: apellidos,
                                  edad: edad, login: login, email: email, password: password}}).subscribe((response) => {
          if (response == null) {

            swall({
              type: 'error',
              title: 'Error de respuesta',
              text: 'No hay respuesta del servidor',
              footer: '',
            });
          } else {

            this.loading = response.loading;
            this.usuario2 = response.data['actualizaUsuario'];

            if (this.usuario2 !== null) {

              swall({
                title: 'Actualizando perfil',
                text: '',
                timer: 1000,
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

  suscribirse (idCategoria: String) {

    swall({
      title: 'Confirmación de suscripción',
      text: '¿Desea realizar la suscripción?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, suscribeme',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
      this.apollo.query({query: creaSuscripcionQuery, variables: {idUsuario: this.idUsuario, idCategoria: idCategoria}})
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
          this.respuesta = response.data['creaSuscripcion'];

          if (this.respuesta !== null) {

            location.reload();
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

  borrarSuscripcion (idSuscripcion: String) {

    swall({
      title: 'Confirmación de borrado',
      text: '¿Estas seguro de borrar la suscripción?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
      this.apollo.query({query: borraSuscripcionQuery, variables: {idSuscripcion: idSuscripcion}})
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
          this.respuesta = response.data['eliminaSuscripcion'];

          if (this.respuesta !== null) {

            location.reload();
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
}
