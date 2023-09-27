import AWS from "aws-sdk"
import express from "express"
import serverless from "serverless-http"

const api = express()
const dbClient = new AWS.DynamoDB.DocumentClient()
const TAB_FUN = process.env.TAB_FUN

api.use(express.json())

//Consulta funcionário pelo código.
api.get("/funcionario/:func_id", async (request, resource) => {
  const params = {
    tabFunc: TAB_FUN,
    Key: {
      func_id: request.params.func_id,
    },
  }

  try {
    const { Item } = await dbClient.get(params).promise()
    if (Item) {
      const { func_id, func_nome, func_cargo, func_idade } = Item
      return resource.json({ func_id, func_nome, func_cargo, func_idade})
    } else {
      return resource
        .status(404)
        .json({ error: `Não foi possível encontrar funcionário com esse identificador: ${func_id}` })
    }
  } catch (error) {
    console.log(error)
    return resource.status(500).json({ error: "Não foi possível recuperar informações do funcionário." })
  }
})

//Consulta funcionário pelo nome
api.get("/funcionario/:func_nome", async (request, resource) => {
  const params = {
    tabFunc: TAB_FUN,
    Key: {
      func_nome: request.params.func_nome,
    },
  }

  try {
    const { Item } = await dbClient.scan(params).promise()
    if (Item) {
      const { func_id, func_nome, func_cargo, func_idade } = Item
      return resource.json({ func_id, func_nome, func_cargo, func_idade})
    } else {
      return resource
        .status(404)
        .json({ error: `Não foi possível encontrar funcionário com esse nome: ${func_nome}` })
    }
  } catch (error) {
    console.log(error)
    return resource.status(500).json({ error: "Não foi possível recuperar informações do funcionário." })
  }
})

//Inclue funcionário
api.post("/funcionario", async (request, resource) => {
  const { func_id, func_nome, func_cargo, func_idade } = request.body

  const params = {
    tabFunc: TAB_FUN,
    Item: {
      func_id,
      func_nome,
      func_cargo,
      func_idade
    },
  }

  try {
    await dbClient.put(params).promise()
    return resource.json({ func_id, func_nome, func_cargo, func_idade })
  } catch (error) {
    console.log(error)
    return resource.status(500).json({ error: "Não foi possível criar funcionário." })
  }
})

//Exclue funcionário.
api.delete("/funcionario/:func_id", async (request, resource) => {
  const params = {
    tabFunc: TAB_FUN,
    Key: {
      func_id: request.params.func_id,
    },
  }

  try {
    await dbClient.delete(params).promise()
    return resource.json({ message: "Funcionário excluído com sucesso." })
  } catch (error) {
    console.log(error)
    return resource.status(500).json({ error: `Não foi possível excluir funcionário: ${request.params.func_id}` })
  }
})

api.use((request, resource, next) => {
  return resource.status(404).json({
    error: "EndPoint não encontrado.",
  })
})

export const handler = serverless(api)