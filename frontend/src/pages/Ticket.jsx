import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';

export const Ticket = () => {
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/');
  };

  if (isLoading) return <Spinner />;

  if (isError) {
    <h4>Something went wrong.</h4>;
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h3>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h3>
        <h4>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h4>
        <h4>Product: {ticket.product}</h4>
        <hr />
        <div className='ticket-desc'>
          <h4>Description of Issue</h4>
          <p>{ticket.description}</p>
        </div>
        {/* <h3>Notes</h3> */}
      </header>
      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close
        </button>
      )}
    </div>
  );
};
