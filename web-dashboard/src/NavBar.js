import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate
  } from 'react-router-dom'
  import { useEffect } from 'react';  
  import { onAuthStateChanged } from 'firebase/auth';
  import {oAuthentication} from './firebase-config';


  import Requests from './Pages/Requests'
  import Organizations from './Pages/Organizations';
  import Reports from './Pages/Reports';
  import Login from './Login';
  import Logout from './Logout'
  import './font.css';
  import './NavBar.css';

  
  function NavBar() {

    const navigate = useNavigate();
    useEffect(() =>{
        onAuthStateChanged(oAuthentication, (oCurrentUser) => {
            if(oCurrentUser != null) {
                navigate("/Organizations");
            }
        });
    }, []);


    return (
        <div className='PageContainer'>
        <div className='leftNavbar'>
          <div className='icon'>Icon</div>
          <nav>
              <NavLink to="Organizations" > Organizations</NavLink>
              <NavLink to="Requests" > Requests</NavLink>
              <NavLink to="Reports" > Reports</NavLink>
          </nav>
          <div className='rightNavbar'>
              <NavLink to="Logout" > Logout </NavLink>
          </div>
        </div>
              <Routes>
                <Route path='/' element={<Login />}/>
                <Route path="/Organizations" element={<Organizations /> }/>
                <Route path="/Requests" element={<Requests /> }/>
                <Route path="/Reports" element={<Reports />} />
                <Route path="Logout" element={<Logout />}/>
              </Routes>
        </div>

    );
  }
  
  export default NavBar;