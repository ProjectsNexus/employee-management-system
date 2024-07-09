import React, { useState } from 'react';
import { httpsCallable } from "firebase/functions";
import { functions } from '../../../functions/firebase'; // Adjust the path if necessary

const CreateAccountForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    username: '',
    dept: '',
    desig: ''
  });
  const [success, setSuccess] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);


    
    try {
      const result = await createSubAccount({
        email: values.email,
        password: values.password,
        username: values.username,
        dept: values.dept,
        desig: values.desig,
      });

      if (result.data.success) {
        setSuccess(true);
      }
    } catch (e) {
      if (e.code === "already-exists") {
        setError("Email is already used.");
      } else {
        setError(e.message);
      }
      console.error(e);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={values.email} onChange={handleChange} required placeholder="Email" />
      <input type="password" name="password" value={values.password} onChange={handleChange} required placeholder="Password" />
      <input type="text" name="username" value={values.username} onChange={handleChange} required placeholder="Username" />
      <input type="text" name="dept" value={values.dept} onChange={handleChange} required placeholder="Department" />
      <input type="text" name="desig" value={values.desig} onChange={handleChange} required placeholder="Designation" />
      <button type="submit" disabled={isLoad}>Create Account</button>
      {error && <p>{error}</p>}
      {success && <p>Account created successfully!</p>}
    </form>
  );
};

export default CreateAccountForm;
