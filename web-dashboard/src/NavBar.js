import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate
  } from 'react-router-dom'
  
  // pages 
  import Requests from './Pages/Requests'
  import Organizations from './Pages/Organizations';
  import Reports from './Pages/Reports';
  import Login from './Login';
  import { useEffect } from 'react';  
  import { onAuthStateChanged } from 'firebase/auth';
  import {oAuthentication} from './firebase-config';


  
  function NavBar() {

    const navigate = useNavigate();
    useEffect(() =>{
        onAuthStateChanged(oAuthentication, (oCurrentUser) => {
            console.log(oCurrentUser);
        });
    });


    return (
        <div>
        <div>
          <nav>
              <h1>l</h1>
              <NavLink to="Organizations" > Organizations</NavLink>
              <NavLink to="Requests" > Requests</NavLink>
              <NavLink to="Reports" > Reports</NavLink>
          </nav>
        </div>
              <Routes>
                <Route path='/' element={<Login />}/>
                <Route path="Organizations" element={<Organizations /> }/>
                <Route path="/Requests" element={<Requests /> }/>
                <Route path="/Reports" element={<Reports />} />
              </Routes>
        </div>

    );
  }
  
  export default NavBar;