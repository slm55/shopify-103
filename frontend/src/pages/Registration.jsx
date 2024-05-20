import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/user";

function Registration() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8000/register", credentials)
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) {
          setLoading(false);
          updateUser();
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.message);
        setCredentials({
          email: "",
          password: "",
          firstname: "",
          lastname: ""
        });
        setLoading(false);
      });
  };

  return (
    <div
      className={`flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ${
        loading ? "opacity-50 " : "opacity-100"
      }`}
    >
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <div className="text-red-900 text-xl ">
            {error}. Please, try again!
          </div>
        )}
        <form className="space-y-6" onSubmit={submitForm}>
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Firstname
            </label>
            <div className="mt-2">
              <input
                id="firstname"
                name="firstname"
                type="text"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                disabled={loading}
                value={credentials.firstname}
                onChange={(e) =>
                  setCredentials({ ...credentials, firstname: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Lastname
            </label>
            <div className="mt-2">
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={credentials.lastname}
                disabled={loading}
                autoComplete="lastname"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setCredentials({ ...credentials, lastname: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={credentials.email}
                disabled={loading}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                disabled={loading}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="text-sm">
            <Link
              to="/login"
              className="font-semibold text-gray-900 hover:text-slate-700"
            >
              Already have an account?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600`}
            >
              {loading ? "Loading" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
