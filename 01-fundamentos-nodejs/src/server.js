import http from 'node:http'
import { json } from 'node:stream/consumers'


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

*/

const users = []

const server = http.createServer(async(req, res) => {
    const { method, url} = req

    const buffers =  []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
    


    if (method == 'GET' && url == '/users') {
        // return res.end('Listagem de usuários')
        // return res.end(JSON.stringify(users))
        // return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users)) // tratar os dados como JSON
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users'){
        const {name, email} = req.body
        users.push({
            id: 1,
            name,
            email
        })
        // return res.end('Criação de usuário')
        return res.writeHead(201).end() // writeHead retorna codigo de status do http
    } 

    // return res.end('Hello World')
    return res.writeHead(404).end() // writeHead retorna codigo de status do http

})

server.listen(3333)