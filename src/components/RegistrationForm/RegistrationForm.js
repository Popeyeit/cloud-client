import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginOperation, registerOperation } from "../../store/user";

function LoginForm() {
  const dispatch = useDispatch();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    currentIdx === 0
      ? dispatch(loginOperation({ email, password }))
      : dispatch(registerOperation({ email, password }));

    // TODO: send data
  };
  const handleChangeTab = (idx) => {
    setCurrentIdx(idx);
  };
  return (
    <div>
      <div>
        <button
          disabled={currentIdx === 0}
          onClick={() => {
            handleChangeTab(0);
          }}
        >
          Login
        </button>
        <button
          disabled={currentIdx === 1}
          onClick={() => {
            handleChangeTab(1);
          }}
        >
          Registration
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email*"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password*"
        />

        {currentIdx === 0 ? (
          <button>Login</button>
        ) : (
          <button>Registration</button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
