import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';

export const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iphone');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/new-ticket');
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, dispatch, message]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
    navigate('/tickets');
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below.</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Customer Email</label>
          <input type='email' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='iMAc'>iMAc</option>
              <option value='MAcBook'>iPhone</option>
              <option value='watch'>Watch</option>
              <option value='airpods'>airpods</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the problem</label>
            <textarea
              name='description'
              id='description'
              className='from-control'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-control'>
            <button className='btn btn-block'>Create Ticket</button>
          </div>
        </form>
      </section>
    </>
  );
};
