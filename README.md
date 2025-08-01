# WEB3 - TaskManager (Smart Contract)

Este é o meu primeiro projeto em **Solidity**, focado na construção de um contrato inteligente para gerenciar uma lista de tarefas totalmente **on-chain**. Ele serve como base para uma aplicação descentralizada (dApp) de lista de tarefas.

## Funcionalidades do Contrato

O contrato inteligente `TaskManager.sol` oferece as seguintes funcionalidades:

  * **Criação de Tarefas:** Adiciona uma nova tarefa com um nome, descrição e um valor associado em **wei**.
  * **Conclusão de Tarefas:** Marca uma tarefa existente como concluída, alterando seu status na blockchain.
  * **Visualização de Dados:** Permite consultar informações como:
      * O número total de tarefas.
      * A quantidade de tarefas concluídas e pendentes.
      * O valor total em **wei** alocado para todas as tarefas.
  * **Armazenamento de Dados:** Cada tarefa armazena as seguintes informações:
      * `id`: Identificador único da tarefa.
      * `nome`: Nome da tarefa.
      * `descricao`: Descrição detalhada.
      * `valor`: Valor em **wei** alocado.
      * `dataCriacao`: Timestamp da criação da tarefa.
      * `dataConclusao`: Timestamp da conclusão da tarefa.
      * `concluida`: Status booleano (`true` ou `false`).

## Tecnologias Utilizadas

  * **Solidity:** Linguagem de programação para a escrita do contrato.
  * **Hardhat:** Ambiente de desenvolvimento para compilação, teste e implantação do contrato na blockchain.

## Como Usar (para Desenvolvedores)

  * [Exemplo de Interface](https://task-manager-4gux.vercel.app/)

### Pré-requisitos

  * [Node.js](https://nodejs.org/en/download/) (versão 18.x ou superior)
  * [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/get-npm)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://docs.github.com/articles/referencing-and-citing-content
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd contract
    ```
3.  Instale as dependências do projeto:
    ```bash
    yarn install
    # ou
    npm install
    ```

### Compilando e Implantando

Para compilar o contrato, use o comando:

```bash
yarn hardhat compile
# ou
npx hardhat compile
```

Para implantar em uma rede local (como Hardhat Network), inicie o nó local e, em um terminal separado, execute o script de implantação:

```bash
# Inicie o nó local
yarn hardhat node

# Em outro terminal, implante o contrato
yarn hardhat run --network localhost scripts/deploy.js
```

Após a implantação, você terá o endereço do contrato para interagir com ele em qualquer interface de front-end ou ferramenta de desenvolvimento.

-----

## Contato

  * **E-mail:** manzano.pje@gmail.com
  * **LinkedIn:** [PAULO-MANZANO](https://www.linkedin.com/in/paulo-manzano)
