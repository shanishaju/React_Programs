import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    dob: '',
    number: '',
    gender: '',
    password: ''
  })
const handleChange =(e)=>{
  const name = e.target.name
  const value = e.target.value
  setFormData({...formData,[name]:value})

}
  
const handleSubmit = (e) => {
  e.preventDefault();

  const { fname, lname, email, dob, number, gender, password } = formData;

  if (!fname || !lname || !email || !dob || !number || !gender || !password) {
    alert("Please fill all fields");
    return;
  }

  if (!email.includes('@')) {
    alert("Enter a valid email");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  alert("Form submitted successfully!");
  // Here you can send the data or reset
  setFormData({
    fname: '',
    lname: '',
    email: '',
    dob: '',
    number: '', 
    password: '',
  })
};

  return (
    <div className='MainDiv'>
      <h1>Registration Form</h1>
      <div className='FormDiv'>
        <form className='form' onSubmit={handleSubmit}>
          <input type="text" name="fname" placeholder='First Name' value={formData.fname} onChange={handleChange} />
          <input type="text" name="lname" placeholder='Last Name' value={formData.lname} onChange={handleChange} />
          <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <input type="number" name="number" placeholder='Phone Number' value={formData.number} onChange={handleChange} />

          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
          </label>

          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />

          <button type="submit">Submit</button>
          <button type="button" onClick={() => setFormData({
            fname: '',
            lname: '',
            email: '',
            dob: '',
            number: '',
            gender: '',
            password: ''
          })}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default App
