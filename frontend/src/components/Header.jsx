import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt />
            Sign in
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
};
