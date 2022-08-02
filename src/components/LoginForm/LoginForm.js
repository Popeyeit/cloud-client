import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginOperation } from "../../store/user";
import { LockClosedIcon } from "@heroicons/react/solid";
import Logo from "../../assets/img/navbar-logo.svg";
import useValidation from "../../hooks/useValidation";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDirtyEmail, setDirtyEmail] = useState(false);
  const [isDirtyPassword, setDirtyPassword] = useState(false);
  const validEmail = useValidation(email, {
    isEmpty: true,
    minLength: 3,
    maxLength: 40,
    isEmail: true,
  });
  const validPassword = useValidation(password, {
    isEmpty: true,
    minLength: 5,
    maxLength: 16,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validEmail.inputValid || !validPassword.inputValid) return;
    dispatch(loginOperation({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="w-auto h-24 mx-auto" src={Logo} alt="pied piper" />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={(e) => setDirtyEmail(true)}
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address*"
              />
            </div>
            <div>
              {isDirtyEmail && validEmail.emailError && (
                <p className="text-sm text-red-600"> Not correct email.</p>
              )}
              {isDirtyEmail && validEmail.isEmpty && (
                <p className="text-sm text-red-600"> Field can not be empty.</p>
              )}{" "}
              {isDirtyEmail &&
                (validEmail.minLengthError || validEmail.maxLengthError) && (
                  <p className="text-sm text-red-600"> Not correct length.</p>
                )}
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={(e) => setDirtyPassword(true)}
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password*"
              />
            </div>
            {isDirtyPassword && validPassword.isEmpty && (
              <p className="text-sm text-red-600"> Field can not be empty.</p>
            )}
            {isDirtyPassword &&
              (validPassword.minLengthError ||
                validPassword.maxLengthError) && (
                <p className="text-sm text-red-600"> Not correct length.</p>
              )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
