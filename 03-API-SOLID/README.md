# Anotações de estudo

## App

GymPass style app.

### RFs (Requisitos funcionais)

- [x] Dever ser possível se cadastrar;
- [x] Dever ser possível se autenticar;
- [x] Dever ser possível obter o perfil de um usuário logado;
- [x] Dever ser possível obter o número de check-in realizados pelo usuário logado;
- [x] Dever ser possível o usuário obter seu histórico de check-in;
- [] Dever ser possível o usuário buscar academias próximas;
- [] Dever ser possível o usuário buscar academias pelo nome;
- [x] Dever ser possível o usuário realizar check-in em uma academia;
- [] Dever ser possível validar o check-in de um usuário;
- [x] Dever ser possível cadastrar uma academia;

### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com u e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptograda;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);

--------------------------------------------------------------------------------------------------------------------------------------

### async e await e Promise



| Palavra   | Significado Infantil                                            | Exemplo                                 |
| --------- | --------------------------------------------------------------- | --------------------------------------- |
| `async`   | “Prometo que vou fazer algo, mas pode demorar”                  | Colocar biscoito no forno               |
| `await`   | “Esperar o biscoito ficar pronto” (mas brincando enquanto isso) | Esperar o forno apitar                  |
| `Promise` | A promessa que o forno vai apitar depois                        | “Prometo que vai ficar pronto em 5 min” |

---------------------------------------------------------------------------------------------------------------------------------------

async function mandarCarta() {
  console.log('📬 Mandando carta...')
  await esperar(2000)
  console.log('📫 Resposta chegou!')
}

mandarCarta()
console.log('⚽ Jogando bola enquanto espero...')

--------------------------------------------------------------------------------------------------------------------------------------

async function assarBiscoito() {
  console.log('🍪 Colocando o biscoito no forno...')
  await esperar(3000) // espera 3 segundos, mas sem travar o resto!
  console.log('✅ O biscoito ficou pronto!')
}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

assarBiscoito()
console.log('🧸 Brincando enquanto o biscoito assa...')

----------------------------------------------------------------------------------------------------------------------------------------

### Sintaxe e logica Javascript 

| Palavra | Pode mudar? | Onde vale?                 | Como é?              |
| ------- | ----------- | -------------------------- | -------------------- |
| `var`   | ✅ Sim       | Em todo lugar (bagunça)    | Antigo e perigoso    |
| `let`   | ✅ Sim       | Só dentro da sala (escopo) | Moderno e organizado |
| `const` | ❌ Não       | Só dentro da sala          | Fixo e seguro        |

----------------------------------------------------------------------------------------------------------------------------------------


| Palavra             | O que faz                                       | Exemplo                         |
| ------------------- | ----------------------------------------------- | ------------------------------- |
| `function`          | Cria uma ação, algo que o JS pode fazer         | `function comer(){}`            |
| `return`            | Diz o que sai de dentro da função               | `return "bolo"`                 |
| `if` / `else`       | Escolhas (como "se isso, faça aquilo")          | `if (idade > 18) {...}`         |
| `for`               | Repete algo várias vezes                        | `for (let i = 0; i < 5; i++)`   |
| `import` / `export` | Serve pra trazer ou levar coisas entre arquivos | `export class Cachorro`         |
| `try` / `catch`     | Tenta algo e pega o erro se der ruim            | `try { ... } catch (e) { ... }` |

----------------------------------------------------------------------------------------------------------------------------------------

🏫 Escolinha do JavaScript
 ├─ 📦 var → bagunceiro (vaza pra todo lado)
 ├─ 📦 let → organizado (só dentro da sala)
 ├─ 📦 const → lacrado (não muda)
 ├─ 🏭 class → fábrica de brinquedos
 ├─ 🪄 new → cria um brinquedo novo
 ├─ ⚙️ function → ensina o brinquedo a fazer algo
 └─ 🔍 if → escolhe caminhos diferentes


----------------------------------------------------------------------------------------------------------------------------------------

| Palavra       | Significado Infantil                                                               | Exemplo Infantil                             |
| ------------- | ---------------------------------------------------------------------------------- | -------------------------------------------- |
| `class`       | É o **molde do brinquedo** — mostra **como ele deve ser feito**                    | “Molde para fazer carrinhos de massinha 🚗”  |
| `constructor` | É o **momento de colocar as pilhas ou peças** no brinquedo para ele funcionar 🔋   | “Colocar pilhas no carrinho novo”            |
| `new`         | É quando você **cria o brinquedo de verdade** usando o molde e coloca as pilhas 🎁 | “Fazer um carrinho novo com o molde e pilha” |

----------------------------------------------------------------------------------------------------------------------------------------


class Carrinho {
  constructor(private pilhas: string) {
    console.log(`🚗 Carrinho com pilhas ${pilhas} criado!`)
  }
}

const meuCarrinho = new Carrinho('Duracell')
console.log('🏁 Vrum vrum! O carrinho está correndo!')

# 🧪 Mapa Mental — TDD (Test Driven Development)

## 🧠 O que é TDD?

> “Escreva o teste **antes** do código, faça ele **falhar**, depois **crie o código** até ele passar ✅.”

TDD = **Test Driven Development**  
(Desenvolvimento Guiado por Testes)

---

## 🎨 Ciclo Mágico do TDD

🟥 **RED** → Escreve o teste e ele falha ❌  
🟩 **GREEN** → Escreve o código mínimo pra ele passar ✅  
🟦 **REFACTOR** → Limpa e melhora o código 🧹  