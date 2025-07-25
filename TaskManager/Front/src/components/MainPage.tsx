import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { ethers } from 'ethers';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import MetricsCard from './MetricsCard';
import TasksChart from './TasksChart';
import ValuesChart from './ValuesChart';
import Header from './Header';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: string;
  deadline: string;
  weiValue: string;
}

const MainPage: React.FC = () => {
  const { contract, account, connected, connect, disconnect } = useWallet();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && contract) loadTasks();
  }, [connected, contract]);

  const loadTasks = async () => {
    if (!contract || !account) return;
    setLoading(true);
    try {
      const taskIds: ethers.BigNumber[] = await contract.getUserTasks(account);
      const list: Task[] = [];
      for (const idBN of taskIds) {
        const t = await contract.getTask(idBN);
        list.push({
          id: t.id.toString(),
          title: t.title,
          description: t.description,
          status: t.status ? 'completed' : 'pending',
          createdAt: new Date(t.createdAt.toNumber() * 1000).toLocaleDateString(),
          deadline: new Date(t.deadline.toNumber() * 1000).toLocaleDateString(),
          weiValue: ethers.utils.formatEther(t.stakeAmount),
        });
      }
      setTasks(list);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  const handleCreate = async (data: { name: string; description: string; weiValue: string; deadline: string }) => {
    if (!contract) return;
    setLoading(true);
    try {
      const deadlineTimestamp = Math.floor(new Date(data.deadline).getTime()/1000);
      await (await contract.createTask(data.name, data.description, deadlineTimestamp, { value: ethers.utils.parseEther(data.weiValue) })).wait();
      await loadTasks();
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  const handleComplete = async (taskId: string) => {
    if (!contract) return;
    setLoading(true);
    try {
      await (await contract.completeTask(parseInt(taskId))).wait();
      await loadTasks();
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-6">
      <Header connected={connected} onConnect={connected ? disconnect : connect} wallet={account} />
      {connected && (
        <>
          <section className="mb-6 grid lg:grid-cols-2 gap-6">
            <MetricsCard ... /> {/* total/pending/completed/wei */}
            <TasksChart ... />
            <ValuesChart tasks={tasks} />
          </section>
          <section>
            <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreate} />
            <button onClick={() => setModalOpen(true)}>Nova Tarefa</button>
            {!loading && tasks.map(task => (
              <TaskCard key={task.id} task={task} onComplete={handleComplete} />
            ))}
            {loading && <p>Carregando...</p>}
          </section>
        </>
      )}
    </div>
  );
};

export default MainPage;
