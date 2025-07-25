export const abi = [
  {
    "type": "function",
    "name": "MINIMUM_STAKE",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "completeTask",
    "inputs": [
      {
        "name": "_id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "completedCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createTask",
    "inputs": [
      {
        "name": "_title",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_description",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_deadline",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getContractBalance",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTask",
    "inputs": [
      {
        "name": "_id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct TaskManager.Task",
        "components": [
          { "name": "id", "type": "uint256", "internalType": "uint256" },
          { "name": "title", "type": "string", "internalType": "string" },
          { "name": "description", "type": "string", "internalType": "string" },
          { "name": "createdAt", "type": "uint256", "internalType": "uint256" },
          { "name": "deadline", "type": "uint256", "internalType": "uint256" },
          { "name": "status", "type": "bool", "internalType": "bool" },
          { "name": "creator", "type": "address", "internalType": "address" },
          { "name": "stakeAmount", "type": "uint256", "internalType": "uint256" },
          { "name": "stakeReturned", "type": "bool", "internalType": "bool" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTaskCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTaskReturnedAmount",
    "inputs": [],
    "outputs": [
      {
        "name": "returnedAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "pendingAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "getTaskStatusCount",
    "inputs": [],
    "outputs": [
      {
        "name": "completed",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "pending",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserTasks",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isTaskOverdue",
    "inputs": [
      {
        "name": "_id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pendingAmount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pendingCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "returnedAmount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "taskCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tasks",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      { "name": "id", "type": "uint256", "internalType": "uint256" },
      { "name": "title", "type": "string", "internalType": "string" },
      { "name": "description", "type": "string", "internalType": "string" },
      { "name": "createdAt", "type": "uint256", "internalType": "uint256" },
      { "name": "deadline", "type": "uint256", "internalType": "uint256" },
      { "name": "status", "type": "bool", "internalType": "bool" },
      { "name": "creator", "type": "address", "internalType": "address" },
      { "name": "stakeAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "stakeReturned", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userTasks",
    "inputs": [
      { "name": "", "type": "address", "internalType": "address" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "StakeLost",
    "inputs": [
      { "name": "id", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "stakeAmount", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TaskCompleted",
    "inputs": [
      { "name": "id", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "stakeReturned", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TaskCreated",
    "inputs": [
      { "name": "id", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "title", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "creator", "type": "address", "indexed": false, "internalType": "address" },
      { "name": "stakeAmount", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "deadline", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TaskStakeUpdated",
    "inputs": [
      { "name": "returnedAmount", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "pendingAmount", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TaskStatusUpdated",
    "inputs": [
      { "name": "completedCount", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "pendingCount", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  }
];
