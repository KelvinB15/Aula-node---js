import { randomUUID } from 'node:crypto'
import { Database } from './middlewares/database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { title } from 'node:process'


const database =  new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            // console.log(req.query)
            // const {search} = req.query
            const filters = req.query

            const hasFilters = filters && Object.keys(filters).length > 0

            const tarefas = database.select('tasks', hasFilters ? filters : undefined) 
            // const tarefa = database.select('tasks', search ? {
            //     title: search,
            //     task: search,
            //     description: search,
            // } : undefined )
            return res.end(JSON.stringify(tarefas))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {title, task, description} = req.body
            
            const tarefa = {
                title,
                id: randomUUID(),
                task,
                description,
            }
            database.insert('tasks', tarefa)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id/:status'),
        handler: (req, res) => {
        const {id} = req.params
        const {title, task, description, status} = req.body

        database.update('tasks', id, {
            title,
            task,
            description,
        })

            return res.writeHead(204).end()
        },
    },
     {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
        const {id} = req.params

        database.delete('tasks', id)
            
            return res.writeHead(204).end()
        },
    },
     {
       method: 'PATCH',
        path: buildRoutePath('/tasks/:id/:status'),
        handler: (req, res) => {
        const {id, status} = req.params
            console.log("passei aqui", req.params)
        if (status != 'concluido' && status !== 'pedente') {
            return res.writeHead(400).end('Status inválido. Use "concluido" ou "pendente".')
        }

        const completed = status === 'concluido'

        database.update('tasks', id, {completed})
            
            return res.writeHead(204).end()
        },
    },
]