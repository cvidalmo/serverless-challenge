/*
SERVERLESS CHALLENGE
====================

AUTOR...: Carlos Vidal.
DATA....: Setembro de 2023.

ENDPOINTS: (Request de entrada deverá ser em JSON).
-------------------------------------------------------------------------
GET: .../funcionario_id/:func_id   > Consultar funcionário pelo ID.
PUT: .../funcionario   > Incluir/Alterar funcionário.
POST: .../funcionario   > Atualizar funcionário.
DELETE: .../funcionario/func_id   > Excluir funcionário.
*******************************************************************************/

/* Biblioteca @aws-sdk/client-dynamodb responsável pelo acesso ao banco de dados DynamoDB.
   Importado somente os recursos que serão usados: Get, Put, Delete, Update e Query. */
import { DynamoDBClient, 
         GetItemCommand,
         QueryCommand,
         PutItemCommand, 
         UpdateItemCommand,
         DeleteItemCommand } from "@aws-sdk/client-dynamodb";
const dbClient = new DynamoDBClient({ region: "us-east-1" });

/* Pacote de estrutura web com classes e métodos que tornam a códifica simples e rápida. */
import express from "express";

/* Pacote que agiliza o acesso a web sem precisar de configuração de servidores complexos. */
import serverless from "serverless-http";

const api = express();  //Cria uma instância da biblioteca "express".
const TAB_FUNC = process.env.TAB_FUN;  //Pega o nome da tabela em váriável de ambiente.

api.use(express.json());  //Seta na "api" que o resquest de entrada será em JSON.



/* Consulta funcionário pelo ID. *********************************/
api.get("/funcionario_id/:func_id", async (request, response) => {
  const comando = new GetItemCommand({
    TableName: TAB_FUNC,
    Key: {
      func_id: {S: request.params.func_id}
    }
  });

  try {
    const retorno = await dbClient.send(comando);
    if (retorno && retorno.Item) {
      const { func_id, func_nome, func_cargo, func_idade } = retorno.Item;
      return response
        .status(200)
        .json({ mensagem: `Consulta do funcionário com ID: ${request.params.func_id}, realizada com sucesso.`,
                dados: { "func_id": func_id["S"], 
                         "func_nome": func_nome["S"], 
                         "func_cargo": func_cargo["S"], 
                         "func_idade": func_idade["S"] }});
    } 

    return response
      .status(404)
      .json({ mensagem: `Não foi encontrado funcionário com ID: ${request.params.func_id}.` });
  
  } catch (erro) {

    return response
    .status(500)
    .json({erro: `Não foi possível recuperar informações do funcionário com ID: ${request.params.func_id}.`,
           endpoint: "GET: .../funcionario_id/:func_id",
           exemplo: ".../funcionario_id/10" });

  }
});



/* Inclusão e Alteração de funcionário. **************/
api.put("/funcionario", async (request, response) => {
  const { func_id, func_nome, func_cargo, func_idade } = request.body;

  const comando = new PutItemCommand({
    TableName: TAB_FUNC,
    Item: {
      func_id: {S: func_id},
      func_nome: {S: func_nome},
      func_cargo: {S: func_cargo},
      func_idade: {S: func_idade}
    } ,
    ReturnValues: "ALL_OLD"
  });

  try {
    const retorno = await dbClient.send(comando);

    if (retorno) {
      if (retorno.Attributes) {
        const { func_id, func_nome, func_cargo, func_idade } = retorno.Attributes;
        return response
          .status(200)
          .json({ mensagem: `Atualização do funcionário ${func_nome["S"]}, realizada com sucesso.`,
                  dados: { "func_id": func_id["S"], 
                           "func_nome": func_nome["S"], 
                           "func_cargo": func_cargo["S"], 
                           "func_idade": func_idade["S"] }});
      }

      return response
        .status(200)
        .json({ mensagem: `Inclusão do funcionário ${func_nome}, realizada com sucesso.`,
                dados: { "func_id": func_id, 
                        "func_nome": func_nome, 
                        "func_cargo": func_cargo, 
                        "func_idade": func_idade }});
    } 

  } catch (erro) {
    return response
      .status(500)
      .json({ erro: `Não foi possível criar funcionário ${func_nome}.`,
              endpoint: "PUT: .../funcionario",
              estrutura_body: {"func_id": "...", 
                              "func_nome": "...", 
                              "func_cargo": "...", 
                              "func_idade": "..."} });
  };

});



/* Atualização de funcionário. ************************/
api.post("/funcionario", async (request, response) => {
  const { func_id, func_nome, func_cargo, func_idade } = request.body;

  const comando = new UpdateItemCommand({
    TableName: TAB_FUNC,
    UpdateExpression : "SET func_nome = :func_nome, func_cargo = :func_cargo, func_idade = :func_idade",
    Key : {
      func_id: {S: func_id},
    },
    ExpressionAttributeValues : {
      ":func_nome": {S: func_nome},
      ":func_cargo": {S: func_cargo},
      ":func_idade": {S: func_idade},
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const retorno = await dbClient.send(comando);

    if (retorno) {
      if (retorno.Attributes) {
        const { func_id, func_nome, func_cargo, func_idade } = retorno.Attributes;
        return response
          .status(200)
          .json({ mensagem: `Atualização do funcionário ${func_nome["S"]}, realizada com sucesso.`,
                  dados: { "func_id": func_id["S"], 
                           "func_nome": func_nome["S"], 
                           "func_cargo": func_cargo["S"], 
                           "func_idade": func_idade["S"] }});
      }

      return response
        .status(404)
        .json({ mensagem: `Não foi possóvel atualizar funcionário ${func_nome}.`});
    } 

  } catch (erro) {
    return response
      .status(500)
      .json({ erro: `Não foi possível atualizar funcionário ${func_nome}.`,
              endpoint: "POST: .../funcionario",
              estrutura_body: {"func_id": "...", 
                               "func_nome": "...", 
                               "func_cargo": "...", 
                               "func_idade": "..."} });
  };

});



/* Exclusão de funcionário. **************************************/
api.delete("/funcionario/:func_id", async (request, response) => {
  const comando = new DeleteItemCommand({
    TableName: TAB_FUNC,
    Key: {
      func_id: {S: request.params.func_id}
    },
    ReturnValues: "ALL_OLD"
  });

  try {
    const retorno = await dbClient.send(comando);
    if (retorno && retorno.Attributes) {
      const { func_id, func_nome, func_cargo, func_idade } = retorno.Attributes;
      return response
        .status(200)
        .json({ mensagem: `Funcionário excluído com sucesso.`,
                dados: {"func_id": func_id["S"], 
                        "func_nome": func_nome["S"], 
                        "func_cargo": func_cargo["S"], 
                        "func_idade": func_idade["S"] }});
    }

    return response
      .status(404)
      .json({ mensagem: `Não foi encontrado funcionário com ID: ${request.params.func_id}.` });

  } catch (erro) {
    
    return response
      .status(500)
      .json({erro: `Não foi possível excluir funcionário com ID: ${request.params.func_id}.`,
             endpoint: "DELETE: .../funcionario/:func_id",
             exemplo: ".../funcionario/6" });
  }
});



/* Caso não seja passado nenhum endpoint valido. */
api.use((request, response, next) => {
  return response
    .status(404)
    .json({erro: "EndPoint não encontrado."});
});



/* Exporta todos recursos da api usando o serverless. */
export const handler = serverless(api);
