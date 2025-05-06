import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('Ernakulam');
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState([]);
  const [editid, setEditid] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !place) {
      alert('Please fill in all fields');
      return;
    }

    if (editid) {
      const updated = todos.map(todo =>
        todo.id === editid ? { ...todo, title, date, place } : todo
      );
      setTodos(updated);
      setEditid(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title,
        date,
        place,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }

    setTitle('');
    setDate('');
    setPlace('Ernakulam');
  };

  const handleUpdate = (todo) => {
    setTitle(todo.title);
    setDate(todo.date);
    setPlace(todo.place);
    setEditid(todo.id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleCheckbox = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filter === 'all' ? true :
      filter === 'completed' ? todo.completed :
      !todo.completed;

    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Todo List</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select value={place} onChange={(e) => setPlace(e.target.value)}>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="TVM">TVM</option>
          </select>
          <button type='submit'>{editid ? 'Update -' : 'Add -'} Todo</button>
        </form>

        {/* Filter buttons */}
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
          <button onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'active' : ''}>Incomplete</button>
        </div>

        {/* Search */}
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ToDo List */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <li key={todo.id} style={{ margin: '10px 0', borderBottom: '1px solid #ccc' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckbox(todo.id)}
              />
              <p style={{ display: 'inline', marginLeft: '10px' }}>{todo.title}</p>
              <span style={{ marginLeft: '10px' }}>{todo.date}</span>
              <span style={{ marginLeft: '10px', fontStyle: 'italic' }}>({todo.place})</span>
              <button onClick={() => handleUpdate(todo)} style={{ marginLeft: '10px' }}>Update</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
