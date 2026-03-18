import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Сохранение при потере фокуса или нажатии Enter
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    } else {
      setEditText(task.text); // Сброс, если ввели пустоту
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      borderBottom: '1px solid #eee',
      background: 'rgba(255, 255, 255, 0.05)'
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ cursor: 'pointer' }}
      />
      
      {isEditing ? (
        <input
          style={{ 
            flex: 1, 
            padding: '5px', 
            borderRadius: '4px', 
            border: '1px solid #007bff',
            outline: 'none' 
          }}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span 
          onDoubleClick={() => setIsEditing(true)}
          title="Двойной клик для редактирования"
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : 'inherit',
            cursor: 'text',
            userSelect: 'none'
          }}
        >
          {task.text}
        </span>
      )}

      <button 
        onClick={() => onDelete(task.id)} 
        style={{ 
          background: '#ff4444', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          padding: '5px 10px',
          cursor: 'pointer' 
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;