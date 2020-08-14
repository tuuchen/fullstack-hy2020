import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleLoginInputChange,
}) => (
  <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username || ''}
          name="Username"
          onChange={handleLoginInputChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password || ''}
          name="Password"
          onChange={handleLoginInputChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </>
)

export default LoginForm
