## Models
Modelos do banco de dados

Sempre que se interage com o modelo no banco, usa-se o objeto que o define

## Routes
Rotas adicionais do servidor, configuradas com base no método REST utilizado e em seu próprio caminho.

Toda rota recebe uma função que por sua vez possui como props:
. req - Requisição feita ao servidor
. res - Resposta dada do servidor
. next - Função usada para "seguir para a próxima função". Mais usada com midlewares

## Views
Templates HTML das páginas integrado com o contexto recebido de cada função nas rotas

### server.js
Configurações gerais do servidor, como midlewares, banco de dados, rotas e estilos