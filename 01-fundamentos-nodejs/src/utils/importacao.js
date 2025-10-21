import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Database } from './src/middlewares/database.js'
import { randomUUID } from 'node:crypto'

// Necessário para usar __dirname com ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const database = new Database()

async function importarTarefas() {
  try {
    const filePath = path.resolve(__dirname, 'import', 'tasks.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const tarefas = JSON.parse(fileContent)

    for (const tarefa of tarefas) {
      database.insert('tasks', {
        id: randomUUID(),
        title: tarefa.title,
        task: tarefa.task,
        description: tarefa.description,
        completed: tarefa.completed ?? false,
      })
    }

    console.log('✅ Tarefas importadas com sucesso.')
  } catch (error) {
    console.error('❌ Erro ao importar tarefas:', error)
  }
}

importarTarefas()
