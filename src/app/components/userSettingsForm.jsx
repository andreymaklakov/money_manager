import React, { useState, useEffect } from "react";
import TextField from "../components/forms/textField";
import { validate, isValid } from "../utils/userSettnigsValidator";
import { useProviderContext } from "./context";

const UserSettingsForm = () => {
  const { allUsers, handleChangeUserParams, signedUser } = useProviderContext();

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    passwordConfirm: ""
  });
  const [errors, setErrors] = useState({});
  const [haveUser, setHaveUser] = useState(false);

  useEffect(() => {
    setData({
      email: signedUser.email,
      password: signedUser.password,
      name: signedUser.name,
      surname: signedUser.surname,
      passwordConfirm: signedUser.password
    });
  }, []);

  useEffect(() => {
    setHaveUser(
      allUsers.filter((user) => user.email === data.email).length ? true : false
    );
  }, [data.email]);

  useEffect(() => {
    validate(data, setErrors);
  }, [data]);

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const formIsEmpty = Object.values(data).filter(
    (value) => value.length
  ).length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(data, setErrors);

    if (!isValid) return;

    if (data.email !== signedUser.email && haveUser) {
      alert(
        "User with this Email already exist, please Log In, or choose another Email."
      );
      return;
    }

    handleChangeUserParams(data.name, data.surname, data.email, data.password);
  };

  isValid(errors);

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div className="bg-white h-auto w-auto min-w-[300px] m-5 rounded-2xl shadow-xl">
        <form
          action=""
          method="post"
          className="px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Change Name:"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your Name..."
          />

          <TextField
            label="Change Surname:"
            name="surname"
            value={data.surname}
            onChange={handleChange}
            placeholder="Enter your Surname..."
          />

          <TextField
            label="Change Email:"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            error={errors.email}
          />

          <TextField
            label="Change Password:"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your password..."
            error={errors.password}
          />

          <TextField
            label="Confirm your Password:"
            type="password"
            name="passwordConfirm"
            value={data.passwordConfirm}
            onChange={handleChange}
            placeholder="Enter your password..."
            error={errors.passwordConfirm}
          />

          <div className="flex justify-end mt-8">
            <button
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" +
                (!isValid(errors) || !formIsEmpty ? " hover:bg-blue-500" : "")
              }
              type="submit"
              disabled={!isValid(errors) || !formIsEmpty}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsForm;
