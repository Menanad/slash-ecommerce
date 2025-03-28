import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/websites/Homepage";
import LogIn from "./pages/websites/login";
import ErrorPage from "./pages/websites/Errorpage";
import Register from "./pages/websites/Register";
import Googlecallback from "./comonants/googlecallback";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectRouts from "./pages/protectedRouts";
import Users from "./pages/dashboard/users";
import UpdateUser from "./pages/dashboard/updateUser";
import AddUser from "./pages/dashboard/addUser";
import Page403 from "./pages/websites/forebidden/403";
import Writer from "./pages/dashboard/writer";
import LoadingBage from "./pages/Loadingpage";
import RequereBack from "./pages/requerBack";
import Categories from "./pages/dashboard/category";
import AddCategouries from "./pages/dashboard/addCategouries";
import UpdateCategorry from "./pages/dashboard/updateCategoury";
import Products from "./pages/dashboard/products";
import AddProducts from "./pages/dashboard/addproduct";
import UpdateProduct from "./pages/dashboard/updateproduct";
import ShowCtegories from "./pages/websites/homePagesComp/Categoriesshowhome";
import WebSite from "./pages/websites/homePagesComp/website";
import HomeComp from "./pages/websites/homecomp/homeComp";
import SingleProduct from "./pages/websites/singleProduct/singleProduct";
import CategouriesComp from "./pages/websites/homePagesComp/categries/categouriescomp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WebSite />}>
          <Route path='/' element={<HomePage />} >
            <Route path='/' element={<HomeComp />} />
            <Route path='/categories' element={<ShowCtegories />} />
            <Route path='/categories/:id' element={<CategouriesComp />} />
 
            <Route path='/product/:id' element={<SingleProduct />} /> 
          </Route>
        </Route>

        <Route element={<RequereBack />}>
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/loading...' element={<LoadingBage />} />

        {/* protected routs  */}
        <Route element={<ProtectRouts allowedRole={["1996", "1995", "1999"]} />}>
          <Route path='/dashboard' element={<Dashboard />} >
            {/* admin */}
            <Route element={<ProtectRouts allowedRole={["1995"]} />}>
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<UpdateUser />} />
              <Route path='addUser' element={<AddUser />} />
            </Route>
            {/* writer */}
            <Route element={<ProtectRouts allowedRole={["1996", "1995"]} />}>
              <Route path='writer' element={<Writer />} />
            </Route>
            {/* Categories */}
            <Route element={<ProtectRouts allowedRole={["1999", "1995"]} />}>
              <Route path='categories' element={<Categories />} />
              <Route path='addcategories' element={<AddCategouries />} />
              <Route path='categories/:id' element={<UpdateCategorry />} />
              {/* Products */}
              <Route path='products' element={<Products />} />
              <Route path='addproducts' element={<AddProducts />} />
              <Route path='products/:id' element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
        <Route path='auth/google/callback' element={<Googlecallback />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='403' element={<Page403 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
