import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/layout';
import Main from './pages/Main';
import Catalog from './pages/Catalog';
import Addresses from './pages/Addresses';
import CategoryPage from './pages/CategoryPage';
import Basket from './pages/Basket';
import PersonalAccount from './pages/PersonalAccount';
import DetailOfProduct from './pages/DetailOfProduct';

import Plug from './Plug';
import useCheckMobileScreen from "./hooks/useCheckMobileScreen";
import PersonalAccountMobile from "./components/myAccountMobile/PersonalAccountMobile";

function App() {
  const isMobile = useCheckMobileScreen();

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Plug />} />

        <Route path='/home' element={<Main />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/catalog/category/:id' element={<CategoryPage />} />
        <Route path='/addresses' element={<Addresses />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/my-account/*' element={isMobile ? <PersonalAccountMobile/> : <PersonalAccount />} />
        <Route path='/product/:id' element={<DetailOfProduct />} />
      </Routes>
    </Layout>
  );
}

export default App;
