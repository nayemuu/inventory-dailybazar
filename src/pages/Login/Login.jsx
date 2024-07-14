import { useEffect, useState } from 'react';
import emailLogo from '../../assets/pages/Login/emailLogo.svg';
import loginLogo from '../../assets/pages/Login/loginLogo.svg';
import passwordLogo from '../../assets/pages/Login/passwordLogo.svg';
import InputForPassword from '../../components/reuseable/auth/Inputs/InputForPassword/InputForPassword';
import InputForText from '../../components/reuseable/auth/Inputs/InputForText/InputForText';
import SubmitButton from '../../components/reuseable/buttons/SubmitButton/SubmitButton';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { errorToastMessage } from '../../utils/toastifyUtils';
import { ToastContainer } from 'react-toastify';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('email = ', email);
    // console.log('password = ', password);

    if (!email?.trim()) {
      return alert('email is required');
    }

    if (!password.trim()) {
      return alert('password is required');
    }

    login({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('data ', data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log('error ', error);
      if (error?.data?.message) {
        errorToastMessage(error.data.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }
    }
  }, [isError, error]);

  return (
    <div>
      <div className="grid md:grid-cols-2">
        <div className="bg-white h-[100vh] hidden md:flex justify-center items-center px-[3vw] ">
          <img src={loginLogo} alt="loginLogo" className="object-contain" />
        </div>
        <div className="bg-[#F4FEFF] min-h-[100vh] flex flex-col justify-center items-center px-[8vw]">
          <div className="max-w-[500px] xxl:max-w-[626px] w-full">
            <div className="flex flex-col gap-[6px] mb-[25px] md:mb-[40px]">
              <div className="text-[26px] md:text-[36px] leading-[28px] md:leading-[38px] font-bold">
                Welcome!
              </div>
              <div className="text-[18px] md:text-[26px] leading-[20px] md:leading-[28px] font-medium">
                Inventory Management System
              </div>
            </div>

            <form className="flex flex-col gap-4" onSubmit={submitHandler}>
              <InputForText
                logo={emailLogo}
                inputType="email"
                placeholder="Email Address"
                value={email}
                setValue={setEmail}
                required={true}
              />

              <InputForPassword
                logo={passwordLogo}
                placeholder="Password"
                value={password}
                setValue={setPassword}
                required={true}
              />

              <SubmitButton
                height="55px"
                //   isLoading={true}
              >
                Submit
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
