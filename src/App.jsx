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
  const [isDark, setIsDark] = useState(false);

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

  const themeStyles = {
    backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9',
    color: isDark ? '#f0f0f0' : '#333',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    padding: '40px 20px'
  };

  return (
    <div style={themeStyles}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        background: isDark ? '#2d2d2d' : '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        
        {/* Шапка: Заголовок и Кнопка темы в один ряд */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Менеджер задач</h1>
          <button 
            onClick={() => setIsDark(!isDark)}
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer', 
              borderRadius: '20px',
              border: '1px solid #ddd',
              background: isDark ? '#444' : '#eee',
              color: 'inherit',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <AddTodoForm onAdd={addTodo} />
        
        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
        />

        <div style={{ marginTop: '20px' }}>
          {filteredTodos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', fontStyle: 'italic' }}>
              {filter === 'all' ? 'Список пуст...' :
               filter === 'active' ? 'Нет активных задач' : 'Выполненных задач нет'}
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  task={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo} 
                />
              ))}
            </ul>
          )}
        </div>

        {todos.length > 0 && (
          <button
            onClick={() => {
              if(window.confirm('Очистить весь список?')) setTodos([]);
            }}
            style={{
              marginTop: '25px',
              padding: '10px',
              background: 'transparent',
              color: '#ff4444',
              border: '1px solid #ff4444',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold'
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