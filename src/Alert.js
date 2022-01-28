import React, {useEffect} from 'react'

const Alert = ({type, removeAlert, message}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [removeAlert]);

  return (
      <p className={`alert alert-${type}`}>
        {message}
      </p>
    );
}

export default Alert
