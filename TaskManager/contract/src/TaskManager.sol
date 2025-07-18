//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13; // a partir de versão 

// início contrato
contract TaskMananger{

    // ========================================
    // EVENTS
    // ========================================
    event TaskCreated(uint256 id, string title, adress creator, uint256 stakeAmount, uint256 deadline);
    event TaskCompleted(uint256 id, uint256 stakeReturned);
    event StakeLost(uint256 id, uint256 stakeAmount);

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

    // ========================================
    // FUNÇÕES
    // ========================================
    
    function createTask(
        string memory _title;       // variável temporária em memória _title
        string memory _description; // variável temporária em memória _description
        uint256 _deadline
    ) public payable{ 
        // require(msg.value >= MINIMUM_STAKE, "Valor mínimo é 0,001 ether");
        // require pode ser escrito como if (recomendado)

        if(msg.value < 0.0000001 ehter){
            revert("Valor mínimo é 0.00000001 ether);
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
            creator: msg.value,
            stakeReturned> false
        });

        userTasks[msg.sender].push(taskCount);
        emit TaskCreated(taskCount, _title, msg.sender, msg.value, _deadline);
    }

    functoin complpeteTask(uint256 _id) public{
        Task storage task = tasks[_id];
        require(task.creator == msg.sender, "Apenas o Criador pode completar");
        requite(!task.status, "Tarefa já concluida);
        require(!task.stakeReturned, "Stake já foi processda);

        task.status = true;
        task.stakeReturned = true;

        // Verificar se completou o prazo
        if(block.timestamp <= task.deadline){

            // DENTRO DO PRAZO - Devolver task
            (bool success, ) = payable(task.creator).call(value:task.stakeAmount)("");
            require(success, "Falha ao devolver stake");
            emit TaskCompleted(_id, task.stakeAmount);
        } else{

            // ATRASADO - Perder stake
            emit taskCompleted(_id,0);
            emit StakeLost(_id, task.stakeAmount);
        }
    }

    function getUserTasks(adress _user) public view returns(uint256[] memory){
        return userTasks(_user);
    }

    functoin getTask(uint256 _id) public view returns(Task memory){
        return Task[_id];
    }

    function getTaskCount() public view returns (uint256){
        return taskCount;
    }

    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

    // Função auxiliar para vertificar se tarefa está atrasada
    function isTaskOverdure(uint256 _id) public view returns (bool){
        Task memory task = tasks[_id];
        return !task.status && block.timestamp > task.deadline;
    }
}
