# App

GymPass style app.

## RFs (Requisitos funcionais)

- [] Dever ser possível se cadastrar;
- [] Dever ser possível se autenticar;
- [] Dever ser possível obter o perfil de um usuário logado;
- [] Dever ser possível obter o número de check-in realizados pelo usuário logado;
- [] Dever ser possível o usuário obter seu histórico de check-in;
- [] Dever ser possível o usuário buscar academias próximas;
- [] Dever ser possível o usuário buscar academias pelo nome;
- [] Dever ser possível o usuário realizar check-in em uma academia;
- [] Dever ser possível validar o check-in de um usuário;
- [] Dever ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com u e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [] A senha do usuário precisa estar criptograda;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);

