import { Usuario } from '../bean/usuario';
import { Articulo } from '../bean/articulo';
import { Categoria } from '../bean/categoria';

// 1
import gql from 'graphql-tag';
import { Comentario } from '../bean/comentario';
import { Suscripcion } from '../bean/suscripciones';

// 2
export const listadoUsuariosQuery = gql`
  query listadoUsuariosQuery {
    listadoUsuarios {
      idUsuario
      nombre
      apellidos
      email
      login
      password,
      enabled,
      uuid
    }
  }
`;

export const listadoArticulosQuery = gql`
  query listadoArticulosQuery {
    listadoArticulos {
      idArticulo,
      titulo,
      imagen,
      descripcion,
      contenido,
      numVisitas
    }
  }
`;

export const listadoArticulosMasVisitadosQuery = gql`
  query listadoArticulosMasVisitadosQuery {
    listadoArticulosPorVisitas {
      idArticulo,
      titulo,
      imagen,
      descripcion,
      contenido,
      numVisitas
    }
  }
`;

export const listadoTagsQuery = gql`
  query listadoTagsQuery {
    listadoCategorias {
      idCategoria,
      nombre,
      imagen
    }
  }
`;

export const listadoTagsPorCategoriaQuery = gql`
query listadoTagsPorCategoriaQuery ($idCategoria: Int) {
  listadoTagsPorCategoria (idCategoria: $idCategoria) {
    idTag,
    articuloTag {
      idArticulo,
      titulo,
      imagen,
      descripcion,
      contenido,
      numVisitas
    }
  }
}
`;

export const compruebaUsuarioQuery = gql`
query compruebaUsuarioQuery ($login: String, $password: String) {
  compruebaUsuario(login: $login, password: $password) {
    idUsuario
    nombre
    apellidos
    email
    login
    password,
    enabled,
    uuid
  }
}
`;

export const ultimoArticuloQuery = gql`
  query ultimoArticuloQuery {
    ultimoArticulo {
      idArticulo,
      titulo,
      imagen,
      descripcion,
      contenido,
      numVisitas
    }
  }
`;

export const creaUsuarioQuery = gql`
query crearUsuario ($nombre: String, $apellidos: String, $edad: String, $login: String, $email: String, $password: String) {
  creaUsuario(nombre: $nombre, apellidos: $apellidos, edad: $edad, login: $login, email: $email, password: $password)
}
`;

export const getArticuloByIdQuery = gql`
query getArticuloByIdQuery ($idArticulo: Int) {
  getArticuloById (idArticulo: $idArticulo) {
    idArticulo,
    titulo,
    imagen,
    descripcion,
    contenido,
    numVisitas
  }
}
`;

export const listadoComentariosPorArticuloQuery = gql`
query listadoComentariosPorArticuloQuery ($idArticulo: Int) {
  listadoComentariosPorArticulo (idArticulo: $idArticulo) {
    idComentario,
    contenido,
    usuarioEstandar {
      idUsuario
      nombre
      apellidos
      email
      login
      password,
      enabled,
      uuid
    }
  }
}
`;

export const listadoCategoriasPorArticuloQuery = gql`
query listadoCategoriasPorArticuloQuery ($idArticulo: Int) {
  listadoCategoriasPorArticulo(idArticulo: $idArticulo) {
    idCategoria,
    nombre
  }
}
`;

export const creaComentarioQuery = gql`
query creaComentarioQuery ($contenido: String, $idArticulo: String, $idUsuario: String) {
  creaComentario(contenido: $contenido, idArticulo: $idArticulo, idUsuario: $idUsuario)
}
`;

export const borraComentarioQuery = gql`
query borraComentarioQuery ($idComentario: Int) {
  borraComentario(idComentario: $idComentario)
}
`;

export const aumentarNumVisitasQuery = gql`
query aumentarNumVisitasQuery ($idArticulo: Int) {
  aumentarNumVisitas(idArticulo: $idArticulo)
}
`;

export const getUsuarioByIdQuery = gql`
query getUsuarioByIdQuery ($idUsuario: Int) {
  getUsuarioById(idUsuario: $idUsuario) {
    idUsuario
    nombre
    apellidos
    edad
    email
    login
    password
    enabled
    uuid
  }
}
`;

export const actualizaUsuarioQuery = gql`
query actualizaUsuarioQuery ($idUsuario: String, $nombre: String, $apellidos: String, $edad: String, $login: String,
                            $email: String, $password: String) {
  actualizaUsuario(idUsuario: $idUsuario, nombre: $nombre, apellidos: $apellidos, edad: $edad, login: $login,
                  email: $email, password: $password) {
    idUsuario
    nombre
    apellidos
    edad
    email
    login
    password
    enabled
    uuid
  }
}
`;

export const getCategoriasSuscritasQuery = gql`
query getCategoriasSuscritasQuery ($idUsuario: Int) {
  getCategoriasSuscritas(idUsuario: $idUsuario) {
    idSuscripcion,
    usuarioSuscriptor {
      idUsuario
      nombre
      apellidos
      edad
      email
      login
      password
      enabled
      uuid
    },
    categoriaSuscrita {
      idCategoria,
      nombre
    }
  }
}
`;

export const getCategoriasNoSuscritasQuery = gql`
query getCategoriasNoSuscritasQuery ($listaIdCategoriasSuscritas: [Int]) {
  getCategoriasNoSuscritas(listaIdCategoriasSuscritas: $listaIdCategoriasSuscritas) {
    idCategoria,
    nombre
  }
}
`;

export const creaSuscripcionQuery = gql`
query creaSuscripcionQuery ($idUsuario: String, $idCategoria: String) {
  creaSuscripcion(idUsuario: $idUsuario, idCategoria: $idCategoria)
}
`;

export const borraSuscripcionQuery = gql`
query borraSuscripcionQuery ($idSuscripcion: String) {
  eliminaSuscripcion(idSuscripcion: $idSuscripcion)
}
`;

export const borraUsuarioQuery = gql`
query borraUsuarioQuery ($idUsuario: String) {
  eliminaUsuario(idUsuario: $idUsuario)
}
`;

export const getCategoriaByIdQuery = gql`
query getCategoriaByIdQuery ($idCategoria: String) {
  getCategoriaById(idCategoria: $idCategoria) {
    idCategoria,
    nombre
  }
}
`;

// 3
export interface ListadoUsuariosQueryResponse {

  listadoUsuarios: Usuario[];
  loading: boolean;
}

export interface ListadoArticulosQueryResponse {

  listadoArticulos: Articulo[];
  loading: boolean;
}

export interface ListadoArticulosMasVisitadosQueryResponse {

  listadoArticulos: Articulo[];
  loading: boolean;
}

export interface ListadoTagsQueryResponse {

  listadoCategorias: Categoria[];
  loading: boolean;
}

export interface ListadoTagsPorCategoriaQueryResponse {

  listadoTags: Categoria[];
  loading: boolean;
}

export interface CompruebaUsuarioQueryResponse {

  listadoUsuarios: Usuario[];
  loading: boolean;
}

export interface UltimoArticuloQueryResponse {

  articulo: Articulo[];
  loading: boolean;
}

export interface CreaUsuarioQueryResponse {

  respuesta: String;
  loading: boolean;
}

export interface GetArticuloByIdQueryResponse {

  articulo: Articulo;
  loading: boolean;
}

export interface ListadoComentariosPorArticuloQueryResponse {

  comentario: Comentario;
  loading: boolean;
}

export interface ListadoCategoriasPorArticuloQueryResponse {

  listadoCategorias: Categoria[];
  loading: boolean;
}

export interface CreaComentarioQueryResponse {

  respuesta: string;
  loading: boolean;
}

export interface BorraComentarioQueryResponse {

  respuesta: string;
  loading: boolean;
}

export interface AumentarNumVisitasQueryResponse {

  respuesta: string;
  loading: boolean;
}

export interface GetUsuarioByIdQueryResponse {

  usuario: Usuario;
  loading: boolean;
}

export interface ActualizaUsuarioQueryResponse {

  usuario: Usuario;
  loading: boolean;
}

export interface ActualizaUsuarioQueryResponse {

  respuesta: String;
  loading: boolean;
}

export interface GetCategoriasSuscritasResponse {

  listadoSuscripcion: Suscripcion[];
  loading: boolean;
}

export interface GetCategoriasNoSuscritasResponse {

  listadoCategorias: Categoria[];
  loading: boolean;
}

export interface CreaSuscripcionResponse {

  respuesta: String;
  loading: boolean;
}

export interface BorraSuscripcionResponse {

  respuesta: String;
  loading: boolean;
}

export interface BorraUsuarioQueryResponse {

  respuesta: String;
  loading: boolean;
}

export interface GetCategoriaByIdQueryResponse {

  categoria: Categoria;
  loading: boolean;
}



