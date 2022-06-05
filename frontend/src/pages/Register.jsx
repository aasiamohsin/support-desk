import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2)
      toast.error('Please fill in the empty fields.');
    if (password !== password2) toast.error('password does not match');
  };

  console.log(formData);

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='text'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter username'
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter email'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
            />
          </div>
          <div className='form-control'>
            <button type='submit' className='btn btn-block'>
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
