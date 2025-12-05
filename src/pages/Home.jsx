import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../contexts/TaskContext';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Stats } from '../components/Stats';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiCircle,
  FiClipboard
} from 'react-icons/fi';

export const Home = () => {
  const { tasks, removeTask, toggleTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleEdit = (task) => {
    navigate(`/edit-task/${task.id}`, { state: { task } });
  };

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      removeTask(taskToDelete);
    }
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <FiClipboard className="header-icon" />
            <h1>Minhas Tarefas</h1>
          </div>
          <button
            className="btn-add"
            onClick={() => navigate('/add-task')}
          >
            <FiPlus /> Nova Tarefa
          </button>
        </div>
        <Stats
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={totalTasks - completedTasks}
        />
      </header>

      <main className="main-content">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <FiClipboard className="empty-icon" />
            <h2>Nenhuma tarefa cadastrada</h2>
            <p>Comece adicionando sua primeira tarefa</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/add-task')}
            >
              <FiPlus /> Adicionar Tarefa
            </button>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? 'completed' : ''}`}
              >
                <button
                  className="task-checkbox"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <FiCheckCircle className="icon-checked" />
                  ) : (
                    <FiCircle className="icon-unchecked" />
                  )}
                </button>

                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                </div>

                <div className="task-actions">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => handleEdit(task)}
                    title="Editar"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(task.id)}
                    title="Excluir"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Excluir Tarefa"
        message="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

