import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Profile from "../myAccount/pages/Profile";
import Favourites from "../myAccount/pages/Favourites";
import OrderHistory from "../myAccount/pages/OrderHistory";
import PrivacyPolicy from "../myAccount/pages/PrivacyPolicy";
import TermsUse from "../myAccount/pages/TermsUse";
import ProfileMobile from "./pages/ProfileMobile";
import ProfileEditMobile from "./pages/ProfileEditMobile";
import NavBarMobile from "../NavBarMobile/NavBarMobile";

const PersonalAccountMobile = () => {
  const current = useLocation();
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    setIsProfile(current.pathname === '/my-account' || current.pathname === '/my-account/')
  }, [current.pathname])

  return (
      <>
        <Routes>
          <Route path='/' element={<ProfileMobile />} />
          <Route path='/edit' element={<ProfileEditMobile />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-use' element={<TermsUse />} />
        </Routes>

        {isProfile
          ? ''
          : <NavBarMobile/>
        }
      </>
  );
};

export default PersonalAccountMobile;