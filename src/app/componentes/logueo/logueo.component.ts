import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, Params } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { compruebaUsuarioQuery, CompruebaUsuarioQueryResponse } from '../../constantes/grahpql';
import { Usuario } from '../../bean/usuario';
import { FormGroup, FormControl } from '@angular/forms';
import swall from 'sweetalert2';


@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html'
})
export class LogueoComponent implements OnInit {

  usuario: Usuario = new Usuario(0, '', '', 0, '', '', 'password', false, '');
  loading: boolean;
  logueado: any;
  formularioLogin: FormGroup;

  constructor(private apollo: Apollo, private router: Router) {

   }

  ngOnInit() {

    this.formularioLogin = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    });

    this.logueado = sessionStorage.getItem('logueado'); // Cookie.get('logueado');
    if (this.logueado != null) {

        this.router.navigateByUrl('home');
    }
  }

  loginUsuario ({ value, valid }: { value: Usuario, valid: boolean }) {

    this.compruebaUsuario(value.login, value.password);
  }

  compruebaUsuario (login: string, password: string) {

    this.apollo.query({query: compruebaUsuarioQuery, variables: {login: login, password: password}})
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
        this.usuario = response.data['compruebaUsuario'];
        if (this.usuario !== null) {
          if (this.usuario.idUsuario !== -1) {

            sessionStorage.setItem('logueado', 'true'); // Cookie.set('logueado', 'true');
            sessionStorage.setItem('usuario', this.usuario.idUsuario.toString());
            // Cookie.set('usuario', this.usuario.idUsuario.toString());

            swall({
              title: 'Iniciando sesión',
              text: '',
              timer: 500,
              onOpen: () => {
                swall.showLoading();
              }
            }).then((result) => {
              if (
                result.dismiss === swall.DismissReason.timer
              ) {

                sessionStorage.setItem('nombreLogin', this.usuario.login); // Cookie.set('nombreLogin', this.usuario.login);
                location.reload();
                this.router.navigateByUrl('home');
              }
            });
          } else {

            swall({
              type: 'error',
              title: 'Usuario no confirmado',
              text: 'Por favor, confirme su cuenta',
              footer: '',
            });
          }
        } else {

          swall({
            type: 'error',
            title: 'Error de autenticación',
            text: 'Login y/o password erroneos',
            footer: '',
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
