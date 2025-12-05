import { useContext, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TaskContext } from '../contexts/TaskContext';
import { FiArrowLeft, FiSave, FiClipboard } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const AddTask = () => {
  const { addTask, editTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isEditing = !!id;
  const taskToEdit = location.state?.task;

  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('O título é obrigatório');
      return;
    }

    if (isEditing && taskToEdit) {
      editTask({
        ...taskToEdit,
        title: title.trim(),
        description: description.trim()
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim()
      });
    }

    navigate('/');
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <FiClipboard className="header-icon" />
            <h1>{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</h1>
          </div>
          <button
            className="btn-back"
            onClick={() => navigate('/')}
          >
            <FiArrowLeft /> Voltar
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <label htmlFor="title">
                Título
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                placeholder="Digite o título da tarefa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Descrição
                <span className="optional">(opcional)</span>
              </label>
              <textarea
                id="description"
                className="form-textarea"
                placeholder="Digite uma descrição para a tarefa"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                <FiSave />
                {isEditing ? 'Salvar Alterações' : 'Adicionar Tarefa'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

