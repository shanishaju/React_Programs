import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setData(JSON.parse(storedUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill all the fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    const newUser = { name, email, password };
    const updatedData = [...data, newUser];

    setData(updatedData);
    localStorage.setItem('users', JSON.stringify(updatedData));
    alert('Form submitted successfully');

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Submitted Users:</h3>
        <ul>
          {data.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
