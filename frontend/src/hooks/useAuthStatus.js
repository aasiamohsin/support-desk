import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
  const [loggedIn, setLoggenIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggenIn(true);
    } else {
      setLoggenIn(false);
    }

    setCheckingStatus(false);
  }, [user]);
  return { loggedIn, checkingStatus };
};
