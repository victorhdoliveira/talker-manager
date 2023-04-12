## Projeto Talker Manager

O objetivo deste projeto é criar uma aplicação para registro de palestrantes (talkers), na qual o usuário poderá cadastrar, visualizar, pesquisar, editar e excluir informações. Para isso, foi desenvolvida uma API com as operações básicas de um CRUD (Criar, Ler, Atualizar e Deletar) para gerenciar os dados dos palestrantes. Também foram criados alguns endpoints que utilizam o módulo fs para ler e escrever informações em um arquivo.

## Tecnologias
* Docker
* docker-compose
* Node.js
* Express

## Instalando Dependências
Clone o repositório do GitHub

```javascript
 git clone git@github.com:victorhdoliveira/talker-manager.git
```

### Com Docker
> Backend

1. Rode os serviços node e db com o seguinte comando: 
```bash
docker-compose up -d
``` 

2. Abra o terminal interativo do container: 
```bash
docker exec -it talker_manager bash
``` 

3. Instale as dependências dentro do container: 
```bash
npm install
``` 
> Testes

4. Dentro do terminal do container:
```bash
npm test
``` 

:warning: Atenção: O git dentro do container não vem configurado com suas credenciais;

### Sem Docker

Instale as dependências
```bash
npm install
``` 
Execute a aplicação

```bash
npm run dev
``` 
