# Web3 TODO - Smart Contracts

Este projeto contém os smart contracts em Solidity para o aplicativo Web3 TODO, um sistema de gerenciamento de tarefas com stake em Wei.

## 📋 Contratos

### 1. Web3Todo.sol
Contrato principal que gerencia as tarefas e stakes dos usuários.

**Principais funcionalidades:**
- ✅ Criar tarefas com stake em Wei
- ✅ Completar tarefas e receber recompensas (98% do stake)
- ✅ Cancelar tarefas com penalidade de 10%
- ✅ Visualizar estatísticas pessoais e globais
- ✅ Sistema de taxas (2% para o contrato)
- ✅ Função de pausa de emergência

### 2. Web3TodoFactory.sol
Factory contract para criar múltiplas instâncias do Web3Todo.

**Principais funcionalidades:**
- ✅ Criar novas instâncias do contrato
- ✅ Gerenciar taxa de criação
- ✅ Rastrear contratos por usuário

## 🚀 Como usar

### Pré-requisitos
```bash
npm install
```

### Compilar contratos
```bash
npm run compile
```

### Executar testes
```bash
npm run test:contracts
```

### Deploy local (Hardhat Network)
```bash
# Terminal 1 - Iniciar rede local
npm run node

# Terminal 2 - Deploy
npm run deploy:local
```

### Deploy em testnet (Sepolia)
```bash
# Configure o .env com suas chaves
cp .env.example .env

# Deploy na Sepolia
npm run deploy:sepolia
```

## 🔧 Configuração

### Arquivo .env
Copie o `.env.example` e configure:

```env
PRIVATE_KEY=sua_chave_privada_aqui
SEPOLIA_URL=https://sepolia.infura.io/v3/SEU_PROJECT_ID
ETHERSCAN_API_KEY=sua_api_key_etherscan
```

### Redes suportadas
- **Local**: Hardhat Network
- **Testnet**: Sepolia, Goerli, Mumbai
- **Mainnet**: Ethereum, Polygon

## 📊 Funcionalidades do Contrato

### Criar Tarefa
```solidity
function createTask(string memory _name, string memory _description) external payable
```
- Requer valor em Wei como stake
- Emite evento `TaskCreated`

### Completar Tarefa
```solidity
function completeTask(uint256 _taskId) external
```
- Apenas o dono da tarefa pode completar
- Retorna 98% do stake (2% fica como taxa)
- Emite evento `TaskCompleted`

### Cancelar Tarefa
```solidity
function cancelTask(uint256 _taskId) external
```
- Penalidade de 10% sobre o stake
- Retorna 90% do valor original
- Emite evento `StakeWithdrawn`

### Estatísticas do Usuário
```solidity
function getUserStats(address _user) external view returns (
    uint256 totalTasks,
    uint256 completedTasks,
    uint256 pendingTasks,
    uint256 totalStaked,
    uint256 totalEarned
)
```

### Estatísticas Globais
```solidity
function getGlobalStats() external view returns (
    uint256 _totalTasksCreated,
    uint256 _totalTasksCompleted,
    uint256 _totalWeiStaked,
    uint256 _contractBalance
)
```

## 🔒 Segurança

### Modificadores implementados:
- `onlyOwner`: Apenas proprietário do contrato
- `onlyTaskOwner`: Apenas dono da tarefa
- `taskExists`: Verifica se tarefa existe
- `taskNotCompleted`: Verifica se tarefa não foi completada
- `whenNotPaused`: Sistema de pausa de emergência

### Recursos de segurança:
- ✅ Reentrancy protection
- ✅ Input validation
- ✅ Emergency pause functionality
- ✅ Fee collection mechanism
- ✅ Proper event emission

## 📈 Taxas e Economia

### Sistema de Taxas:
- **Completar tarefa**: 2% do stake vai para o contrato
- **Cancelar tarefa**: 10% de penalidade
- **Criar instância (Factory)**: 0.001 ETH

### Fluxo de Wei:
1. Usuário cria tarefa → Wei fica em stake no contrato
2. Usuário completa tarefa → Recebe 98% do stake
3. Usuário cancela tarefa → Recebe 90% do stake
4. Proprietário do contrato pode coletar taxas acumuladas

## 🧪 Testes

Os testes cobrem:
- ✅ Deploy e inicialização
- ✅ Criação de tarefas
- ✅ Completar tarefas
- ✅ Cancelar tarefas
- ✅ Estatísticas de usuário
- ✅ Estatísticas globais
- ✅ Validações de segurança
- ✅ Sistema de taxas

Execute com:
```bash
npm run test:contracts
```

## 📝 Eventos

### TaskCreated
```solidity
event TaskCreated(
    uint256 indexed taskId,
    address indexed owner,
    string name,
    uint256 weiValue,
    uint256 timestamp
);
```

### TaskCompleted
```solidity
event TaskCompleted(
    uint256 indexed taskId,
    address indexed owner,
    uint256 weiValue,
    uint256 timestamp
);
```

### StakeWithdrawn
```solidity
event StakeWithdrawn(
    address indexed user,
    uint256 amount,
    uint256 timestamp
);
```

## 🔗 Integração com Frontend

Após o deploy, os endereços dos contratos são salvos em:
```
src/contracts/addresses.json
```

O ABI está disponível em:
```
src/contracts/Web3TodoABI.json
```

## 📄 Licença

MIT License - veja o arquivo de licença para detalhes.