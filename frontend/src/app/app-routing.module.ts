import { NgModule } from "@angular/core";

//iniciar o roteamento
// importar o módulo de roteamento
import { RouterModule, Routes } from "@angular/router";
import { ListarProdutosComponent } from "./pages/listar-produtos/listar-produtos.component";
import { NovoProdutoComponent } from "./pages/novo-produto/novo-produto.component";
import { ProdutoInvalidoComponent } from "./pages/produto-invalido/produto-invalido.component";
import { ProdutoComponent } from "./pages/produto/produto.component";

//rota é igual um componente
//const rotas é responsável por armazenar as rotas que existem dentro do site e cada item do array de rotas é uma nova rota que foi declarada
const rotas: Routes = [ // cada objeto é uma rota
    {   
                                // http://localhost:4200
        path: '',               // caminho para acessar a rota (string vazia significa a rota principal)
        redirectTo: 'produtos', // redireciona o usuário para outra página no momento que ele entrar nessa rota
        pathMatch: 'full'
    },
    {
        path: 'produtos',
        component: ListarProdutosComponent
    },
   
    {
        path: 'produtos/novo',
        component: NovoProdutoComponent
    },
    {
        path: 'produtos/invalido',
        component: ProdutoInvalidoComponent
    },
    {
        path: 'produtos/:idProduto', // rota com parâmetro idProduto
        component: ProdutoComponent
    },
]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forRoot(rotas) // módulo que inicia o roteamento e carrega as rotas que estão dentro do array
    ],
    providers:[],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}