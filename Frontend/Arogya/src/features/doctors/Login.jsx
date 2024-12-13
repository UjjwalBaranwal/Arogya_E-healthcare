import { LockClosedIcon } from '@heroicons/react/20/solid';
// import Header from '../Header';
import { useDispatch } from 'react-redux';  // Import useDispatch
import {login} from "../../redux/authSlice"
import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors before submitting

    try {
      const loginResponse = await fetch('http://localhost:3000/api/v1/doctor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await loginResponse.json();
      setIsLoading(false);

      if (loginResponse.ok) {
        const{
          token,data:{user},
        }=data;
        dispatch(login({ token, user}));
        toast.success('Congratulations you have logged in');
        navigate('/doctor');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error has occurred');
      console.log(err);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/logo.png" alt="" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in as Doctor
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <NavLink to="/doctorSignup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </NavLink>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  placeholder="Email address"
                  value={email} // Controlled input
                  onChange={(e) => setEmail(e.target.value)} // Update state
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  placeholder="Password"
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)} // Update state
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/forget" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading} // Disable button when loading
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <a href="/" className="flex justify-center jCISvWkW5oStPH6Wrb_H ay0ziTPUL4Ag5d1DkSY7 neyUwteEn7DOg9pBSJJE _WclR59Ji8jwfmjPtOei _gKcj49wZgnwx1LpcJi6 bFARDnno0HUtfhktTXfR MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH qHIOIw8TObHgD3VvKa5x yjGyQxv8jnYk9_MGMqLN _Qk4_E9_iLqcHsRZZ4ge PWreZZgitgAm_Nv4Noh9 pxHuWvF853ck68OLN6ef DpMPWwlSESiYA8EE1xKM _xQT_qSXfwWf6ZhwRle4 m_8FxTcpOfmK___hAaJ6 _FONMPVaCsLFJJGDaaIL _bKyZ1er5YE_NnrwOCm9 __8kBLtrR_iuU2wW25Lp _cpMMPjFQqjJu4i0Puod eCx_6PNzncAD5yo7Qcic _BIVSYBXQUqEf_ltPrSk DTyjKhtXBNaebZa5L0l9 _OovBxfPdK7Rjv2nh2Ot">
        <svg className="h-8 w-8 mx-1 float-left eUuXwBkW5W4__eatjSfd RRXFBumaW2SHdseZaWm6 _gmxfZ2BpOHxa6nWwqBB" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_13183_10121)">
            <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"></path>
            <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.94925 14.396 5.94925 12.0493C5.94925 9.70257 8.09669 7.05524 10.7056 7.05524C12.055 7.05524 13.2115 7.3996 14.1081 8.00965L17.3306 5.51098C15.6734 3.98234 13.3989 3.09684 10.7019 3.09684C6.42786 3.09684 3.23725 5.23015 3.23725 7.94926C3.23725 10.6683 6.42786 12.8016 10.7019 12.8016C12.0613 12.8016 13.2177 12.4572 14.1141 11.8471L17.3296 14.2712C15.5868 16.0219 13.2998 16.9002 10.7019 16.9002C7.66124 16.9002 5.23181 15.2229 5.23181 13.2303C5.23181 11.2376 7.66124 9.56028 10.7019 9.56028C11.699 9.56028 12.6609 9.86944 13.3192 10.4293" fill="#3F83F8"></path>
          </g>
        </svg>
        <span className="font-normal text-xl">Sign in with Google</span>
      </a>
    </>
  );
}
