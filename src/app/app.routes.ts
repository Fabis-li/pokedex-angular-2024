import { Routes } from "@angular/router";
import { ListagemComponent } from "./component/listagem/listagem.component";
import { DetalhesComponent } from "./component/detalhes/detalhes.component";

export const routes: Routes = [
    { path: '', redirectTo: 'listagem', pathMatch: 'full' },
    { path: 'listagem', component: ListagemComponent },
    { path: 'detalhes/:id', component: DetalhesComponent }

];

