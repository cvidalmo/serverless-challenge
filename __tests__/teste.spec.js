const request = require("supertest");
const url = "https://xpqq0dj9f9.execute-api.us-east-1.amazonaws.com";

//-------------------------------------------------------------------------

//GET: .../funcionario_id/:func_id   > Consultar funcionário pelo ID.
test("Consultar funcionário pelo ID - Existente", async () => {
    const retorno = await request(url).get("/funcionario_id/1");
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(200);
});

test("Consultar funcionário pelo ID - NÃO Existente", async () => {
    const retorno = await request(url).get("/funcionario_id/999");
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(404);
});  //*/

//-------------------------------------------------------------------------

//PUT: .../funcionario   > Incluir/Alterar funcionário.
test("Incluir/Alterar funcionário - Incluir", async () => {
    const envio = {"func_id": "100",
                   "func_nome": "Carlos Melo",
                   "func_cargo": "Piloto",
                   "func_idade": "33"};
    const retorno = await request(url).put("/funcionario").send(envio);
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(200);
});

test("Incluir/Alterar funcionário - Alterar", async () => {
    const envio = {"func_id": "1",
                   "func_nome": "Carlos Melo 1",
                   "func_cargo": "Piloto 1",
                   "func_idade": "53"};
    const retorno = await request(url).put("/funcionario").send(envio);
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(200);
});

test("Incluir/Alterar funcionário - ERRO", async () => {
    const envio = {"func_id": "1",
                   //"func_nome": "Carlos Melo 1",
                   "func_cargo": "Piloto 1",
                   "func_idade": "53"};
    const retorno = await request(url).put("/funcionario").send(envio);
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(500);
});  //*/

//-------------------------------------------------------------------------

//POST: .../funcionario   > Atualizar funcionário.
test("Atualizar funcionário - Existente", async () => {
    const envio = {"func_id": "100",
                   "func_nome": "Carlos Melo",
                   "func_cargo": "Piloto",
                   "func_idade": "33"};
    const retorno = await request(url).post("/funcionario").send(envio);
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(200);
});

test("Atualizar funcionário - NÃO Existente", async () => {
    const envio = {"func_id": "999",
                   "func_nome": "Carlos Melo 1",
                   "func_cargo": "Piloto 1",
                   "func_idade": "53"};
    const retorno = await request(url).post("/funcionario").send(envio);
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(200);
});

test("Atualizar funcionário - ERRO", async () => {
    const envio = {"func_id": "1",
                   //"func_nome": "Carlos Melo 1",
                   "func_cargo": "Piloto 1",
                   "func_idade": "53"};
    const retorno = await request(url).post("/funcionario").send(envio);
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(500);
});  //*/

//-------------------------------------------------------------------------

//DELETE: .../funcionario/func_id   > Excluir funcionário.
test("Excluir funcionário - Existente", async () => {
    const retorno = await request(url).del("/funcionario/4");
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(200);
});  

test("Excluir funcionário - NÃO Existente", async () => {
    const retorno = await request(url).del("/funcionario/999");
    //console.log(retorno.status);
    //console.log(retorno._body);
    expect(retorno.status).toBe(404);
});  //*/

//=========================================================================
