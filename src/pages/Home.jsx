import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
// import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, } from 'firebase/auth';

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  // const handleSignIn = async (event) => {
  //   event.preventDefault();
  //   const email = event.target.email.value;
  //   const password = event.target.password.value;

  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  //     // Signed in successfully
  //     console.log('User signed in:', firebase.auth().currentUser);
  //     // Redirect or perform other actions after signin
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //     // Handle sign-in error here (e.g., display an error message)
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/gallery-image");
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        if (error.code === "auth/wrong-password") {
        } else if (error.code === "auth/invalid-email") {
        } else {
          return;
        }
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gallery App</h1>
          {/* Add navigation links if needed */}
        </div>
      </nav>
      <div className="container mx-auto mt-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Gallery</h1>
        <div className="max-w-3xl">
          <p className="text-gray-800">
            Discover and share beautiful images from around the world.
          </p>
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in for a Personalized Experience
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4 w-full" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
        onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none px-3 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
            onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none px-3 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "Loading" : "Sign In"}
                </button>
              <p className="mt-3 text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Signup
                </Link>
            </p>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;