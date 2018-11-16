// Dependencias
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GraphQLModule} from './apollo.config';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { TagsComponent } from './componentes/tags/tags.component';
import { HomeComponent } from './componentes/home/home.component';
import { LogueoComponent } from './componentes/logueo/logueo.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ArticuloComponent } from './componentes/articulo/articulo.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

const routes: Routes = [
  {path: 'home',                                        component: HomeComponent},
  {path: 'tags',                                        component: TagsComponent},
  {path: 'articulo/:idArticulo',                        component: ArticuloComponent},
  {path: 'articulos',                                   component: ArticulosComponent},
  {path: 'articulos/:idTag',                            component: ArticulosComponent},
  {path: 'articulos/:masVisitados',                     component: ArticulosComponent},
  {path: 'iniciarSesion',                               component: LogueoComponent},
  {path: 'registro',                                    component: RegistroComponent},
  {path: 'perfil',                                      component: PerfilComponent},
  {path: '**',                                          pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticulosComponent,
    TagsComponent,
    HomeComponent,
    LogueoComponent,
    RegistroComponent,
    ArticuloComponent,
    PerfilComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'ignore'}),
    GraphQLModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
