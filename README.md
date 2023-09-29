
## Requisitos

Deve ter conta na Amazon e GitHub.

Criar na Amazon, usuário IAM para acessar com o AWS CLI.

Instalar o Git.

Baixar o AWS CLI.

Fazer login no Serverless Framework.

Baixar o GitHub Desktop.

Baixe o projeto do GitHub:

- git clone https://github.com/cvidalmo/serverless-challenge.git

## Bibliotecas necessárias
Use o comando npm para instalar as bibliotecas:

- npm i aws-sdk
- npm i @aws-sdk/client-dynamodb
- npm i express
- npm i serverless-http
- npm i serverless
- npm i serverless-esbuild


## serverless.yml
Arquivo de configuração do Serverless Framework para o projeto.

Nesse arquivo, alterar o valor de ORG para o seu usuário do Serverless Framework.

org: cvidalmo

app: serverless-challenge

service: serverless-challenge


## Testes
Para fazer os testes, deve-se seguir os seguintes passos:

Instalar as bibliotecas JEST e SUPERTEST.

- npm i -D jest
- npm i -D supertest

O arquivo com os testes a serem feitos estão dentro da pasta: /\_\_tests\_\_/teste.spec.js

- Execute: npx jest


## ENDPOINTS:
Entrada deverá ser em JSON.

URL: https://xpqq0dj9f9.execute-api.us-east-1.amazonaws.com

- GET: .../funcionario_id/:func_id   > Consultar funcionário pelo ID.
- PUT: .../funcionario   > Incluir/Alterar funcionário.
- POST: .../funcionario   > Atualizar funcionário.
- DELETE: .../funcionario/func_id   > Excluir funcionário.


#



# Serverless Challenge

# Antes de começar....

- [Keep it simple](https://pt.wikipedia.org/wiki/Princ%C3%ADpio_KISS), entendemos que você possui suas prioridades e nossa proposta é com esse desafio é ter uma idéia geral de como você faz seus códigos, toma suas decisões arquiteturais e o seu conhecimento geral sobre os assuntos abordados.

O desafio que propomos é provisionar uma infraestrutura na AWS, em que se tenha uma lambda que sejá capaz de registrar em um banco de dados relacional ou não relacional, dados sobre funcionários de uma empresa.

## Observação
- Não tem problema se você não conseguir finalizar tudo! Não deixe de enviar seu desafio por isso!

## Requisitos
 1. Utilizar Clean Architectute
 2. Seu desafio precisa estar versionado no Github, em um repositório público.
 3. Documentação é primordial e vamos nos guiar por ela ;)
 4. Um funcionário deve possuir como atributos : Id , Idade , Nome e Cargo<br/>
 5. Salvar as informações necessárias em um banco de dados relacional ou não relacional de sua escolha dentro de uma infraestrutura AWS<br/>
 6. Será necessário que a Lambda consiga consultar, deletar e atualizar um funcionário e que ele esteja acessível via internet.<br/>
 7. Os recuros podem ser provisionados por serveless framework ou terraform.
 8. Realizar testes unitário com JEST.

