/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../redux/features/auth/authSlice';
import { initiateProfileInfo } from '../redux/features/profile/profileSlice';

function useLocalPropertiesCheck() {
  const [propertiesChecked, setPropertieshChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Checking user was logged in or not
    const localAuth = localStorage.getItem('auth');
    const localProfile = localStorage.getItem('profile');
    // console.log('localAuth = ', localAuth);
    // console.log('localProfile = ', localProfile);

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken) {
        // console.log(auth);
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
          })
        );
      }
    }

    if (localProfile) {
      const profile = JSON.parse(localProfile);
      if (profile) {
        dispatch(
          initiateProfileInfo({
            name: profile.name,
            email: profile.email,
          })
        );
      }
    }

    // console.log('LocalPropertiesChecked');
    setPropertieshChecked(true);
  }, []);

  return propertiesChecked;
}

export default useLocalPropertiesCheck;
