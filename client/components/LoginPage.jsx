import React from 'react';

const LoginPage = () => {
  const handleSubmit = () => {
    const data = {};
    data.username = document.getElementById('username').value;
    data.password = document.getElementById('password').value;
    return fetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <div className='login'>
      <h1>{'Login'}</h1>
      <label>
        Username:
        <input
          type='text'
          id='username'
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          id='password'
        />
      </label>
      <button
        className='button'
        id='login-button'
        onClick={handleSubmit}
      >
        LOG IN
      </button>
      {/* {isLoginPage ? 'Login' : 'Signup'} */}
      {/* {!isLoginPage && (
        <label>
          Confirm Password:
          <input
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            type='password'
            name='name'
          />
        </label>
      )}
      {isLoginPage ? (
        <p>
          Not signed up?{' '}
          <span
            className='highlighted'
            onClick={() => {
              setUsername('');
              setPassword('');
              setPasswordConfirm('');
              setIsLoginPage(!isLoginPage);
            }}
          >
            Sign Up
          </span>
        </p>
      ) : (
        <p>
          Already a member?{' '}
          <span
            className='highlighted'
            onClick={() => {
              setUsername('');
              setPassword('');
              setPasswordConfirm('');
              setIsLoginPage(!isLoginPage);
            }}
          >
            Login
          </span>
        </p>
      )} */}
    </div>
  );
};

export default LoginPage;
