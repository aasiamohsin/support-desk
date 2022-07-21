import { useState, useEffect } from 'react';
import { FaSignInAlt, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, navigate, message, reset]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in the empty fields.');
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <FaSpinner />;
  }

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
