# 📦 ShowBank - Modelagem de Dados com MongoDB

Este projeto demonstra diferentes abordagens de **modelagem de dados no MongoDB** aplicadas ao contexto de um banco fictício chamado **ShowBank**. O foco está em apresentar esquemas validados com **JSON Schema**, uso de **documentos incorporados e referenciados**, bem como **estruturas de árvore**, **controle de versão de schema** e **operações atômicas**.

---

## 📂 Estrutura do Projeto

### 1. **Coleções e Modelagem**

#### ✅ **Modelagem com Dados Incorporados**
- `clientes`: contém os campos pessoais e objetos incorporados como `Endereco` e `Contas`.

#### 🔗 **Modelagem com Referência**
- `clientes`: dados pessoais básicos.
- `contas`: referencia os clientes via **DBRef**.
- `endereco`: também utiliza **DBRef** para ligação com clientes.
- ➕ Também há exemplos com **referência manual**, onde o ID do cliente é armazenado diretamente (`id_cliente`) e a ligação é feita por meio de código, sem uso de DBRef.

### 2. **Relacionamentos**

#### 1️⃣ **Um-para-um (Incorporado)**
- Um único `Endereco` ou `Conta` diretamente dentro do documento do cliente.

#### 🌐 **Um-para-muitos**
- Com documentos incorporados (array de `enderecos`).
- Com documentos referenciados (vários documentos `endereco` e `contas` referenciando um cliente).

### 3. **Estruturas de Árvore (Hierarquias)**

Demonstração de múltiplos padrões de hierarquia de dados:

| Padrão               | Coleção         | Descrição                                               |
|----------------------|------------------|-----------------------------------------------------------|
| Parent Reference     | `Pai`            | Cada nó possui referência ao pai.                         |
| Child Reference      | `Filho`          | Cada nó armazena os filhos em um array.                  |
| Array of Ancestors   | `Ancestrais`     | Cada nó armazena todos seus ancestrais.                  |
| Materialized Path    | `Materializados` | Armazena caminho em string.                              |
| Nested Sets          | `aninhados`      | Usa valores `left` e `right` para representar a árvore.  |

### 4. **Controle de Versão de Schema**
- Utilização de campo `schema_version` para diferenciar versões do esquema.
- Exemplos mostram clientes com e sem o campo `Salario`.

### 5. **Operações Atômicas**
- Exemplo de controle de estoque em uma coleção de livros.
- Uso de `$inc` e `$push` para garantir integridade transacional.

### 6. **Referência Estendida**
- Armazenamento parcial de endereço no cliente.
- Dados completos de endereço mantidos em coleção separada.
