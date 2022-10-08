import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import TextField from "./forms/textField";
import { validator, isValid } from "../utils";
import { useProviderContext } from "./context";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginIsWorng, setLoginIsWrong] = useState(false);

  const history = useHistory();

  const { allUsers, handleSignedUser } = useProviderContext();

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate(data, setErrors);
  }, [data]);

  const validate = useCallback((data, setErrors) => {
    const errors = validator(data);

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }, []);

  const handleLogIn = (user) => {
    history.replace(`/main/${user.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(data, setErrors);

    if (!isValid) return;

    const user = allUsers.filter(
      (user) => user.email === data.email && user.password === data.password
    );

    if (user.length) {
      setLoginIsWrong(false);
      handleSignedUser(...user);
      handleLogIn(...user);
    }
    setLoginIsWrong(true);
  };

  isValid(errors);

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="text-center font-medium	text-xl">Log In</h1>
      <div className="bg-white h-auto w-auto min-w-[300px] m-5 rounded-2xl shadow-xl">
        <form
          method="post"
          className="px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email:"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            error={errors.email}
          />

          <TextField
            label="Password:"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your password..."
            error={errors.password}
          />

          <div className="flex items-center justify-between mt-8">
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/signup"
            >
              Sign Up
            </Link>

            <button
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" +
                (!isValid(errors) ? " hover:bg-blue-500" : "")
              }
              type="submit"
              disabled={!isValid(errors)}
            >
              Log In
            </button>
          </div>

          {loginIsWorng && (
            <div className="text-sm text-red-500 ">
              Email or Password is incorrect. <br />
              Please try one more time.
            </div>
          )}
        </form>
      </div>
      <p className="text-center text-gray-500 text-xs">
        &copy;2022 Money Manager. All rights reserved.
      </p>
    </div>
  );
};

export default LoginForm;
