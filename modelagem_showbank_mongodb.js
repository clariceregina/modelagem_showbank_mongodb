// criar coleção em que contas e endereço sejam objetos (utilizando a estrutura de dados incorporados)

db.createCollection("clientes",
{
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Nome", "CPF","Status_Civil","Data_Nascimento","Endereco", "Genero", "Profissao", "Contas"],
            properties:{
                Nome:{
                bsonType: "string",
                maxLength:150,
                description: "informe corretamente o nome do cliente"
                },
                CPF:{
                bsonType: "string",
                minLength:14,
                maxLength:14,
                description: "informe corretamente o cpf do cliente" 
                },
                Status_Civil:{
                bsonType: "string",
                enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                description: "informe corretamente o status civil do cliente" 
                },
                Data_Nascimento:{
                bsonType: ["string", "null"],
                description: "informe corretamente a data de nascimento do cliente"  
                },
                Endereco:{
                    bsonType: "object",
                    required:["Rua","Numero","Bairro","Cidade","Estado","CEP"],
                    properties:{
                        Rua:{
                            bsonType: "string"},
                        Numero:{
                            bsonType: "int"},    
                        Bairro:{
                            bsonType: "string"},  
                        Cidade:{
                            bsonType: "string"}, 
                        Estado:{
                            bsonType: "string"},    
                        CEP:{
                            bsonType: "string"} 
                    }
                },
                Genero:{
                bsonType: "string",
                description: "informe corretamente o genero do cliente" 
                },
                Profissao:{
                bsonType: "string",
                description: "informe corretamente o profissão do cliente"},
                Contas:{
                    bsonType:"object",
                    required:["Numero_Conta", "Tipo", "CPF", "Valor","Agência"],
                    properties:{
                        Numero_Conta:{
                            bsonType: "string"  
                        },
                        Tipo:{
                            bsonType: "string",
                            enum:["Conta corrente", "Conta poupança", "Conta salário"]  
                        },
                        CPF:{
                            bsonType: "string",
                            minLength:14,
                            maxLength:14 
                        },
                        Valor:{
                            bsonType: "double"  
                        },
                        Agência:{
                            bsonType: "string"     
                        }
                    }
                }
            }     
        }

    }
})

// inserir um dado
db.clientes.insertOne({
"_id":1,
"Nome": "Cauê Luan da Paz",
 "CPF": "426.239.760-23",
 "Data_Nascimento": "16/02/1967",
 "Genero": "Masculino", 
 "Profissao": "Vendedor em comércio atacadista", 
 "Endereco": {
   "Rua":"Vinte e Quatro", 
   "Numero": 121, 
   "Bairro": "Três Vendas", 
   "Cidade":"Pelotas", 
   "Estado":"RS", 
   "CEP": "96071-380"},
 "Contas":{
   "Numero_Conta": "0265177-7", 
   "Agência": "5575", 
   "Tipo": "Conta salário", 
   "CPF": "426.239.760-23", 
   "Valor": 1.411
 },
 "Status_Civil": "Casado(a)"
 })

// criar coleção em que contas e endereço sejam coleções diferentes de clientes (utilizando a estrutura de referências)

db.createCollection("clientes",
{
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Nome", "CPF", "Status_Civil", "Data_Nascimento", "Genero", "Profissao"],
            properties:{
                Nome:{
                bsonType: "string",
                maxLength:150,
                description: "informe corretamente o nome do cliente"
                },
                CPF:{
                bsonType: "string",
                minLength:14,
                maxLength:14,
                description: "informe corretamente o cpf do cliente"
                },
                Status_Civil:{
                bsonType: "string",
                enum:["Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"],
                description: "informe corretamente o status civil do cliente"
                },
                Data_Nascimento:{
                bsonType: ["string", "null"],
                description: "informe corretamente a data de nascimento do cliente" 
                },
                Genero:{
                bsonType: "string",
                description: "informe corretamente o genero do cliente"
                },
                Profissao: {
                bsonType: "string",
                description: "informe corretamente a profissao do cliente"}
            }
        }
    }
})

db.createCollection("contas",
{
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["Numero_Conta", "Tipo", "CPF", "Valor", "Agência"],
            properties:{
                Numero_Conta:{
                bsonType: "string",
                description: "informe corretamente o numero da conta"
                },
                Tipo:{
                bsonType: "string",
                enum: ["Conta corrente", "Conta poupança", "Conta salário"],
                description: "informe corretamente o tipo da conta"
                },
                CPF:{
                bsonType: "string",
                minLength:14,
                maxLength:14,
                description: "informe corretamente o cpf do cliente na conta"
                },
                Valor:{
                bsonType: "double",
                description: "informe corretamente o valor da conta"
                },
                Agência:{
                bsonType: ["string", "null"],
                description: "informe corretamente a Agência"}
            }
        }
    }
})

// inserir dados nas três coleções
db.clientes.insertOne({
"_id":1,
"Nome": "Flávia Carla Rocha",
"CPF": "063.668.976-03",
"Data_Nascimento": "12/07/1944",
"Genero": "Feminino", 
"Profissao": "Auxiliar de enfermagem",
"Status_Civil": "Casado(a)"
})

// inserir documento na coleção conta e endereço que faça referência à coleção clientes utilizando a convenção DBRef (no VSCode)

db.contas.insertOne({
"_id": ObjectId(),
"creator":{
    "$ref": "clientes",
    "$id": original_id,
    "$db": "modelagem02"
    },
"Numero_Conta": "48495901-2",
"Agência": "5575",
"Tipo": "Conta corrente",
"CPF": "936.261.726-94",
"Valor": 2.366})

db.endereco.insertOne({
"creator": {
    "$ref": "clientes",
    "$id": original_id,
    "$db": "modelagem02"},
"Rua": "Adelso Ferreira Tavares",
"Numero": 661,
"Bairro": "Tubalina",
"Cidade": "Uberlândia",
"Estado": "MG",
"CEP": "38412-010"
})

// relacionamento um para um em documentos incorporados (um único valor em cada documento incorporado)

use("modelagem")      

db.clientes.insertOne({
"_id": 4,
"Nome": "Juliana Eloá Brito",
"CPF": "208.862.381-70",
"Data_Nascimento": "26/06/1991",
"Genero": "Feminino",
"Profissao": "Trabalhador de serviços de limpeza",
"Endereco": {
    "Rua": "Euza D'Aparecida Roriz dos Anjos",
    "Numero": 617,
    "Bairro": "Setor Leste",
    "Cidade": "Luziânia",
    "Estado": "GO",
    "CEP": "72803-590"},
"Contas": {
    "Numero_Conta": "0189393-9",
    "Agência": "5575",
    "Tipo": "Conta salário",
    "CPF": "208.862.381-70",
    "Valor": 5.242},
"Status_Civil": "Solteiro(a)"})

// relacionamento um para muitos em documentos incorporados (mais de um único valor em pelo menos um documento incorporado)

db.clientes.insertOne({
"_id": 3,
"Nome": "Luan Caio da Silva",
"CPF": "520.233.763-94",
"Data_Nascimento": "14/10/1949",
"Genero": "Masculino",
"Profissao": "Atendente de farmácia",
"Endereco": [{ 
    "Rua": "João Alberto",
    "Numero": 224,
    "Bairro": "Santa Clara",
    "Cidade": "São Luís",
    "Estado": "MA",
    "CEP": "65058-623"
    },{
    "Rua": "Rua das Camelias",
    "Numero": 333,
    "Bairro": "Santa Tereza",
    "Cidade": "São Luís",
    "Estado": "MA",
    "CEP": "65058-623"
    }],
"Contas": {
    "Numero_Conta": "67314-4",
    "Agência": "5575",
    "Tipo": "Conta poupança",
    "CPF": "520.233.763-94",
    "Valor": 2.860
    },
"Status_Civil": "Viúvo(a)"
})

// relacionamento um para muitos com documentos referenciados ou com referências de documentos

db.clientes. insertOne({
    "_id": 3,
    "Nome": "Marcos Benedito Rodrigues",
    "CPF": "099.632.834-38",
    "Data Nascimento": "18/10/1972",
    "Genero": "Masculino",
    "Profissao": "Professor do EJA ensino fundamental",
    "Status Civil": "Divorciado(a)"
})

db.endereco.insertMany([
    {"_id": 1,
    "creator" : {
        "$ref": "clientes",
        "$id":3,
        "$db": "modelagem02"},
    "Rua": "Rua das Acácias",
    "Numero": 287,
    "Bairro":"Centro",
    "Cidade": "Parnamirim",
    "Estado":"RN",
    "CEP":"59140-030"
},{
    "_id": 2,
    "creator" : {
        "Sref": "clientes",
        "$id":3,
        "$db": "modelagem02"},
        "Rua": "Rua das Acácias",
    "Numero": 287,
    "Bairro":"Centro",
    "Cidade": "Parnamirim",
    "Estado": "RN",
    "CEP":"59140-030"
    }])
    
db.contas. insertOne({
    "_id": 1,
    "creator" : {
        "$ref": "clientes",
        "$id":3,
        "$db": "modelagem02"},
    "Numero_Conta": "1095052-4",
    "Agência": "5575",
    "Tipo": "Conta poupança",
    "CPF": "099.632.834-38",
    "Valor": 9.855
})

// estrutura de árvore: parent references (duas infos - _id e parent - dentro de cada documento)

db.Pai.insertMany([
    {_id:"Colaborador01" , parent:"Supervisor02"},
    {_id:"Colaborador02" , parent:"Supervisor02"},
    {_id:"Supervisor02", parent:"Gerente"},
    {_id:"Supervisor01", parent:"Gerente"},
    {_id:"Gerente", parent:"Gerente geral"},
    {_id:"Gerente geral", parent: null}
])

// filtrar apenas o documento que tenha "Supervisor02" como _id, pedindo somente a informação de seu parent

db.Pai.findOne({_id:"Supervisor02"}).parent

// estrutura de árvore: child references (duas infos - _id e children - dentro de cada documento)

db.createCollection("Filho")

db.Filho.insertMany([
    {_id:"Colaborador01" , children:[]},
    {_id:"Colaborador02" , children:[]},
    {_id:"Supervisor01", children:[]},
    {_id:"Supervisor02", children:["Colaborador01", "Colaborador02"]},
    {_id:"Gerente", children:["Supervisor01", "Supervisor02"]},
    {_id:"Gerente geral", children:["Gerente"]}
])

// filtrar todos os filhos do documento que tenha "Gerente" como id

db.Filho.findOne({_id:"Gerente"}).children

// estrutura de árvore: array of ancestors ou array de ancestrais ( armazenamos em um documento o nó e todos os seus ancestrais)

db.createCollection("Ancestrais")

db.Ancestrais.insertMany([
    {_id:"Colaborador01", ancestors:["Gerente geral", "Gerente", "Supervisor02"], parent:"Supervisor02"},
    {_id:"Colaborador02", ancestors:["Gerente geral", "Gerente", "Supervisor02"], parent:"Supervisor02"},
    {_id:"Supervisor02", ancestors:["Gerente geral", "Gerente"], parent:"Gerente"},
    {_id:"Supervisor01", ancestors:["Gerente geral", "Gerente"], parent:"Gerente"},
    {_id:"Gerente", ancestors:["Gerente geral"], parent:"Gerente geral"},
    {_id:"Gerente geral", ancestors:[], parent:null}
])

// filtrar os ancestrais do documento cujo id seja "Supervisor02"
db.Ancestrais.findOne({_id:"Supervisor02"}).ancestors

// solicitar o pai deste id
db.Ancestrais.findOne({_id:"Supervisor02"}).parent

// estrutura de árvore: materialized paths ou caminhos materializados

db.createCollection("Materializados")

db.Materializados.insertMany([
    {_id:"Gerente geral", path:null},
    {_id:"Gerente", path:"Gerente geral"},
    {_id:"Supervisor02", path:"Gerente geral,Gerente"},
    {_id:"Supervisor01", path:"Gerente geral,Gerente"},
    {_id:"Colaborador01", path:"Gerente geral,Gerente,Supervisor02"},
    {_id:"Colaborador02", path:"Gerente geral,Gerente,Supervisor02"}
])

// filtrar pelo documento que tem "Gerente geral" como path

db.Materializados.findOne({path:"Gerente geral"})

// estrutura de árvore: padrão nested sets ou padrão de conjuntos aninhados

db.aninhados.insertMany( [
   { _id: "Gerente Geral", parent: 0, left: 1, right: 12 },
   { _id: "Gerente", parent: "Gerente Geral", left: 2, right: 11 },
   { _id: "Supervisor01", parent: "Gerente", left: 3, right: 4 },
   { _id: "Supervisor02", parent: "Gerente", left: 5, right: 10 },
   { _id: "Colaborador01", parent: "Supervisor02", left: 6, right: 7 },
   { _id: "Colaborador02", parent: "Supervisor02", left: 8, right: 9 }
] )

// inserir schema_version para diferenciar novos documentos inseridos com salário dos antigos que não solicitavam

db.clientes.insertOne({
    "_id": 6,
    "schema_version": "2",
    "Nome": "Catarina Sebastiana Baptista",
    "CPF": "138.934.992-61",
    "Data Nascimento": "14/07/2003",
    "Genero": "Feminino",
    "Profissao": "Atendente de lanchonete",
    "Status Civil": "Casado(a)",
    "Salario": 2.500})

db.endereco.insertOne({
    "_id": 5,
    "id_cliente": 6,
    "Rua": "João Aires Leitão",
    "Numero": 534,
    "Bairro":"Paraviana",
    "Cidade": "Boa Vista",
    "Estado":"RR",
    "CEP":"69307-370"})

db.contas.insertOne({
    "_id": 8,
    "id_cliente": 6,
    "Numero_Conta": "50453-8",
    "Agência": "5575",
    "Tipo": "Conta poupança",
    "CPF": "138.934.992-61",
    "Valor": 1.227})

// padrão de operações atômicas	(informações que precisam ser atualizadas juntas são centralizadas em um único local)

use livraria

db.livros.insertOne({
    _id: 1,
    titulo: "MongoDB: Construa novas aplicações com novas tecnologias",
    autor: ["Fernando Boaglio"],
    data_publicacao: ISODate("2015-01-24"),
    paginas: 244,
    linguagem: "Português",
    id_editora: "Casa do código",
    Estoque: 3,
    checkout: [{por: "David", data: ISODate("2022-10-15")}]
})

// atualizar quando uma nova pessoa faz o aluguel do livro com incremento negativo ao estoque

db.livros.updateOne(
    {_id: 1, Estoque: {$gt: 0}},
    {
        $inc: {Estoque: -1},
        $push: {checkout: {por: "Danielle", data: new Date() } }
    }
)

// padrão de referência estendida: fazer a referência estendida apenas de rua, numero e bairro incluindo na coleção de clientes um sub-documento

use vendas

db.clientes.insertOne({
    "_id": 1,
    "Nome": "Melissa Joana Mendes",
    "cpf": "738.424.165-04",
    "Data Nascimento": "13/10/1957",
    "Genero": "Feminino",
    "Empresa": "Alimentos LTDa",
    "Profissao": "Assistente administrativo",
    "Endereco":{
            "Rua": "Travessa João Passos",
            "Numero": 191,
            "Bairro":"Olaria"
        }
})

db.endereco.insertOne({
    "Rua": "Travessa João Passos",
    "Numero": 191,
    "Bairro":"Olaria",
    "Cidade": "Aracaju",
    "Estado":"SE",
    "CEP":"49092-200"
})