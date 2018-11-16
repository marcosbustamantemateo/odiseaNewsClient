import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, EmailValidator } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Usuario } from '../../bean/usuario';
import swall from 'sweetalert2';
import { Router, Params } from '@angular/router';
import { creaUsuarioQuery, CreaUsuarioQueryResponse } from '../../constantes/grahpql';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;
  usuario: Usuario;
  usuarioInput: Usuario;
  valor: number;
  loading: boolean;
  respuesta: string;

  constructor(private apollo: Apollo, private router: Router) {

    this.loading = false;
    this.respuesta = '';
   }

  ngOnInit() {

    this.valor = 0;

    this.formularioRegistro = new FormGroup({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      edad: new FormControl(''),
      email: new FormControl(''),
      login: new FormControl(''),
      password: new FormControl('')
    });
  }

  isValidEmail(mail: string): boolean {

    // tslint:disable-next-line:max-line-length
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail);
  }

  registroUsuario ({ value, valid }: { value: Usuario, valid: boolean }) {

    const email = '/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i';
    const password2 = (<HTMLInputElement> document.getElementById('password2')).value;

    if (value.nombre === '' || value.apellidos === '' || value.login === '' || value.email === '' || value.edad < 0
        || value.password === '' || password2 === '' || value.edad.toString() === '' || !this.isValidEmail(value.email) ||
        value.password !== password2) {

        swall({
          type: 'error',
          title: 'Error de validación',
          text: 'Rellene los datos correctamente',
          footer: '',
        });
    } else {
      this.compruebaUsuario(value.nombre, value.apellidos, value.edad, value.login, value.email, value.password);
    }
  }

  compruebaUsuario (nombre: String, apellidos: String, edad: number, login: String, email: String, password: String) {

    this.apollo.query({query: creaUsuarioQuery, variables: {nombre: nombre, apellidos: apellidos, edad: edad, login: login,
      email: email, password: password}})
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
        this.respuesta = response.data['creaUsuario'];

        if (this.respuesta != null) {

          if (this.respuesta === 'ERROR') {

            swall({
              type: 'error',
              title: 'Login y/o email ya existente',
              text: 'Cambie sus datos',
              footer: '',
            });
          } else {
            swall({
              title: 'Registrando usuarios',
              text: 'Confirme su email',
              timer: 1000,
              onOpen: () => {
                swall.showLoading();
              }
            }).then((result) => {
              if (
                result.dismiss === swall.DismissReason.timer
              ) {
                this.router.navigateByUrl('iniciarSesion');
              }
            });
          }
        } else {
          swall({
            type: 'error',
            title: 'Usuario no registrado',
            text: 'Login y/o email existentes',
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
