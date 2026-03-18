import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');
  const [isDark, setIsDark] = useState(false); // Состояние для темы

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  // Стили для темной темы
  const themeStyles = {
    backgroundColor: isDark ? '#333' : '#fff',
    color: isDark ? '#fff' : '#333',
    minHeight: '100vh',
    transition: 'all 0.3s',
    padding: '20px'
  };

  return (
    <div style={themeStyles}>
      <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        
        {/* Кнопка переключения темы */}
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <button 
            onClick={() => setIsDark(!isDark)}
            style={{ padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
          >
            {isDark ? '☀️ Светлая тема' : '🌙 Темная тема'}
          </button>
        </div>

        <h1 style={{ textAlign: 'center' }}>Менеджер задач</h1>
        
        <AddTodoForm onAdd={addTodo} />
        
        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
        />

        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>
            {filter === 'all' ? 'Задач пока нет' :
             filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                task={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo} // Передаем функцию редактирования
              />
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <button
            onClick={() => setTodos([])}
            style={{
              marginTop: '20px',
              padding: '8px 16px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Очистить всё
          </button>
        )}
      </div>
    </div>
  );
}

export default App;