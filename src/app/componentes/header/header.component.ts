import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import swall from 'sweetalert2';
import { Router, Params } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  logueado: any;
  nombreLogin: any;

  constructor(private router: Router) {

    this.logueado = sessionStorage.getItem('logueado'); // Cookie.get('logueado');
    this.nombreLogin = sessionStorage.getItem('nombreLogin'); // Cookie.get('nombreLogin');
  }

  ngOnInit() {

  }

  tags () {

    sessionStorage.removeItem('masVisitados'); // Cookie.delete('masVisitados');
  }

  cerrarSesion () {

    swall({
      title: 'Cerrando sesión',
      text: '',
      timer: 500,
      onOpen: () => {
        swall.showLoading();
      }
    }).then((result) => {
      if (
        result.dismiss === swall.DismissReason.timer
      ) {
        sessionStorage.removeItem('logueado'); // Cookie.delete('logueado');
        sessionStorage.removeItem('nombreLogin'); // Cookie.delete('nombreLogin');
        sessionStorage.removeItem('key'); // Cookie.delete('usuario');
        location.reload();

      }
    });

  }

}
