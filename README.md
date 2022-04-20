# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️

![Exemplo app front](./front-example.png)

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

Fui responsável pelo desenvolvimento de uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que funcionem consumindo um banco de dados.

Nesse projeto, foi construido **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. O desenvolvimento **respeitou as regras de negócio** providas no projeto e **a API é capaz de ser consumida por um front-end já provido nesse projeto**.

Foi exercitado nesse projeto:

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;

---

## O que foi desenvolvido

Uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. Começando pela API, foi desenvolvido alguns endpoints (seguindo os princípios **REST**) que estão conectados ao banco de dados!

O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que é exibida para a pessoa usuária do sistema.

---

## Desenvolvimento

Foi desenvolvida uma aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize`.

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Temos um relacionamento entre as tabelas `clubs` e `matchs` para fazermos as atualizações das partidas.

---

# Instalação do projeto

## Executado com Docker:

1. Clone o repositório
  * `git clone git@github.com:dihsantanna/trybe-futebol-clube.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd trybe-futebol-clube`

2. Instale as dependências
  * `npm install`

3. Execute a aplicação utilizando o *docker compose*
  * execute o comando `npm run compose:up`
  * acesse [http://localhost:3000/](http://localhost:3000/) pra executar o as funcionalidades da aplicação;

4. Para parar a execução:
  * execute o comando `npm run compose:down` 

---

## Executando com sem o docker

`IMPORTANTE`: Caso queira executar tudo sem utilizar o docker será necessário configurar as variáveis de ambiente dentro de `app/backend`. 
* renomeie o arquivo `.env.example` para `.env`;
* adicione as chaves `DB_HOST`, `DB_USER` e `DB_PASS` com as informações do seu banco de dados `mysql` local.

1. Execute os passos 1 e 2 do executando com Docker;
2. Na raiz do projeto execute:
* `npm run backend`
3. Abra outro terminal e na raiz do projeto execute:
* `npm run frontend`

---

### Login

- Para logar basta inserir:
  ```json
  email: "admin@admin.com",
  password: "secret_admin"
  ```

***
**Em breve estarei disponibilizado o deploy da aplicação fullstack.