import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    NavLink
  } from 'react-router-dom'
  
  // pages 
  import Requests from './pages/Requests'
  import Organizations from './pages/Organizations'
  import Reports from './pages/Reports';
  
  function App() {
    return (
      <BrowserRouter>
        <div>
          <nav>
              <h1>l</h1>
              <NavLink to="/" > Organizations</NavLink>
              <NavLink to="Requests" > Requests</NavLink>
              <NavLink to="Reports" > Reports</NavLink>
          </nav>
        </div>
            <main>
              <Routes>
                <Route path="/" element={<Organizations /> }/>
                <Route path="/Requests" element={<Requests /> }/>
                <Route path="/Reports" element={<Reports />} />
              </Routes>
            </main>
      </BrowserRouter>
    );
  }
  
  export default App;