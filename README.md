# WEB3 - Task Manager (Smart Contract)

Este é o meu primeiro projeto em **Solidity**, focado na construção de um contrato inteligente para gerenciar uma lista de tarefas totalmente **on-chain**.
Ele serve como base para uma aplicação descentralizada (dApp) de lista de tarefas.

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
  * **Foundry:** Toolkit de desenvolvimento para Ethereum, usado para compilação, teste e implantação do contrato.
  * **Forge:** Ferramenta do Foundry para compilação e testes.
  * **Anvil:** Ferramenta do Foundry que atua como um nó local de teste.

## Como Usar (para Desenvolvedores)

### Pré-requisitos

  * [Foundry](https://getfoundry.sh/) instalado.
  * [Git](https://git-scm.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/manzano-pje/TaskManager.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd contract/src
    ```
3.  Instale as dependências:
    ```bash
    forge install
    ```

### Compilando e Testando

Para compilar o contrato, use o comando:

```bash
forge build
```

Para rodar os testes, use:

```bash
forge test
```

### Implantando

Para implantar em uma rede local, primeiro inicie o nó de teste **Anvil**:

```bash
anvil
```

Em um terminal separado, execute o script de implantação com **Forge**:

```bash
forge script script/Deploy.s.sol:Deploy --rpc-url http://127.0.0.1:8545 --private-key [SUA_CHAVE_PRIVADA] --broadcast
```

  * **Observação:** Substitua `[SUA_CHAVE_PRIVADA]` pela chave privada de uma das contas fornecidas pelo Anvil.

Após a implantação, você terá o endereço do contrato para interagir com ele em qualquer interface de front-end ou ferramenta de desenvolvimento.

-----

## Contato
  
  * **LinkedIn:** [paulo-manzano](https://www.linkedin.com/in/paulo-manzano)
