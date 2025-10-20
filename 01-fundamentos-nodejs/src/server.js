import http from 'node:http'
import { randomUUID } from 'node:crypto'
import {json} from './middlewares/json.js'
import { Database } from './middlewares/database.js'
// import { json } from 'node:stream/consumers'


// Criar um usuário (name, email, senha)
/* 
request = importar -- vai receber
response = exportar -- vai enviar

Método HTTP
URL

GET, POST, PUT, PATCH, DELETE

GET => Buscar uma recurso do back-end
POST => Criar uma recurso no back-end
PUT => Atualizar um recurso no back-end
PATCH => Atualizar uma infromação especifica de um recurso no back-end
DELETE => Deletar um recurso do back-end

GET /users => Buscando usuários do back-end
POST /users => Criar um usuário no back-end

Stateful - Stateless

JSON - Javascript Object Notation - transição de dados entre back-end e front-end

Cabeçalhos (Requisição/resposta) => Metadados

HTTP status COD - writeHead retorna codigo de status do http

await => aguarda uma função ser executada pra prosseguir no codigo

*/

// const users = []

const database = new Database()

const server = http.createServer(async(req, res) => {
    const { method, url} = req

    // aguardando a função ser realizada para proseeguir
    await json(req, res)
    


    if (method == 'GET' && url == '/users') {
        const users = database.select('users')
        // return res.end('Listagem de usuários')
        // return res.end(JSON.stringify(users))
        // return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users)) // tratar os dados como JSON
        return res
        // .setHeader('Content-type', 'application/json') => transformando os dados do backend em json
        .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users'){
        const {name, email} = req.body
        
        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user)
        
        // return res.end('Criação de usuário')
        return res.writeHead(201).end() // writeHead retorna codigo de status do http
    } 

    // return res.end('Hello World')
    return res.writeHead(404).end() // writeHead retorna codigo de status do http

})

server.listen(3333)