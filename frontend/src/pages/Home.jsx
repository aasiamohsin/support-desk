import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

export const Home = () => {
  return (
    <>
      <section className='heading'>
        <h1>What do yo need help with?</h1>
        <p>Please choose an option from below.</p>
      </section>
      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt />
        View My Ticket
      </Link>
    </>
  );
};
