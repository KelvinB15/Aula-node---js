import http from 'node:http'


// Criar um usuário (name, email, senha)
/* 
request = importar -- vai receber
response = exportar -- vai enviar
*/

const server = http.createServer((request, response) => {
    return response.end('Hello World')
})

server.listen(3333)
consoleekwoqdkqw