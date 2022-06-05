import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(formData);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) toast.error('Please fill in the empty fields.');
  };
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt size={22} /> Sign In
        </h1>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
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
              placeholder='Enter Password'
            />
          </div>
          <div className='form-control'>
            <button className='btn btn-block'>Sign in</button>
          </div>
        </form>
      </section>
    </>
  );
};
