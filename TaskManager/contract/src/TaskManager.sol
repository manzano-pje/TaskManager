//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13; // a partir de versão 

// início contrato
contract TaskManager{

    // ========================================
    // EVENTS
    // ========================================
    event TaskCreated(uint256 id, string title, address creator, uint256 stakeAmount, uint256 deadline);
    event TaskCompleted(uint256 id, uint256 stakeReturned);
    event StakeLost(uint256 id, uint256 stakeAmount);
    event TaskStatusUpdated(uint256 completedCount, uint256 pendingCount);  // Gráfico Distribuição de tarefas
    event TaskStakeUpdated(uint256 returnedAmount, uint256 pendingAmount);  // Gráfico Distribuição de valores                

    // ========================================
    // STRUCT
    // ========================================
    struct Task {               
        uint256 id;             // Número único da tarefa
        string title;           // Título da tarefa
        string description;     // Descrição da tarefa
        uint256 createdAt;      // Quando foi criada (timestamp)
        uint256 deadline;       // Prazo limite (timestamp)
        bool status;            // false = não feita, true = feita
        address creator;        // Quem criou a tarefa
        uint256 stakeAmount;    // Quanto depositou em Wei
        bool stakeReturned;     // Se já devolveu o dinheiro
    }

    // ========================================
    // VARIÁVEIS DE ESTADO
    // ========================================
    mapping(uint256 => Task) public tasks;              // Lista de todas as tarefas
    mapping(address => uint256[]) public userTasks;     // Tarefas de cada usuário
    uint256 public taskCount = 0;                       // Contador de tarefas
    uint256 public constant MINIMUM_STAKE = 0.001 ether;// Valor mínimo
    uint256 public completedCount = 0;                  // Contador de tasks completadas
    uint256 public pendingCount = 0;                    // Contadoe de Tasks pendentes
    uint256 public pendingAmount = 0;                   // Valor total pendente
    uint256 public returnedAmount = 0;                  // Valor total devolvido


    // ========================================
    // FUNÇÕES
    // ========================================
    
    function createTask(
        string memory _title,       // variável temporária em memória _title
        string memory _description, // variável temporária em memória _description
        uint256 _deadline           // variável indicando tempo final
    )   public payable{ 
            // require(msg.value >= MINIMUM_STAKE, "Valor mínimo é 0,001 ether");
            // require pode ser escrito como if (recomendado)

            if(msg.value < MINIMUM_STAKE){
                revert("Valor minimo e 0.00000001 ether");
            }
            require(_deadline > block.timestamp, "Prazo deve ser maior que agora");

            taskCount ++;
            tasks[taskCount] = Task({
                id: taskCount,
                title: _title,
                description: _description,
                createdAt: block.timestamp,
                deadline: _deadline,
                status: false,
                creator: msg.sender,
                stakeAmount:msg.value,
                stakeReturned: false
            });
            pendingCount ++;
            pendingAmount = pendingAmount + msg.value;
            userTasks[msg.sender].push(taskCount);
            emit TaskCreated(taskCount, _title, msg.sender, msg.value, _deadline);
        }
    

    function completeTask(uint256 _id) public{
        Task storage task = tasks[_id];
        require(task.creator == msg.sender, "Apenas o Criador pode completar");
        require(!task.status, "Tarefa ja concluida");
        require(!task.stakeReturned, "Stake ja foi processda");

        task.status = true;
        task.stakeReturned = true;

        // Verificar se completou o prazo
        if(block.timestamp <= task.deadline){

            // DENTRO DO PRAZO - Devolver task
            (bool success, ) = payable(task.creator).call{value:task.stakeAmount}("");
            require(success, "Falha ao devolver stake");
            completedCount ++;
            pendingCount --;
            returnedAmount = returnedAmount + task.stakeAmount;
            pendingAmount = pendingAmount - task.stakeAmount;
            emit TaskCompleted(_id, task.stakeAmount);
        } else{

            // ATRASADO - Perder stake
            emit TaskCompleted(_id,0);
            emit StakeLost(_id, task.stakeAmount);
        }
    }

    function getUserTasks(address _user) public view returns(uint256[] memory){
        return userTasks[_user];
    }

    function getTask(uint256 _id) public view returns(Task memory){
        return tasks[_id];
    }

    function getTaskCount() public view returns (uint256){
        return taskCount;
    }

    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

    function getTaskStatusCount() public view returns(uint256 completed, uint256 pending){
        return (completedCount, pendingCount);
    }

    function getTaskRetunnedAmount() public view returns(uint256 returnedAmount, uint256 pendingAmount){
        return (returnedAmount, pendingAmount);
    }

    // Função auxiliar para vertificar se tarefa está atrasada
    function isTaskOverdue(uint256 _id) public view returns (bool){
        Task memory task = tasks[_id];
        return !task.status && block.timestamp > task.deadline;
    }
}