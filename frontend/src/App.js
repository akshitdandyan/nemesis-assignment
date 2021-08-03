import './styles.scss';
import Auth from './UIComponents/Auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PopUp from './UIComponents/PopUp/PopUp';
import React, { useState, lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./UIComponents/Dashboard/Dashboard'))

function App() {

  // Only few components were needed to built for this cute project, 
  // so I didn't used Redux as using redux for smaller state exchanges might slow down rendering of our app

  const [ popUpState, setPopUpState ] = useState({ message:"", type:"" });

  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading</div>}>
      <div className="app-wrapper">
        <PopUp popUpState={popUpState} setPopUpState={setPopUpState} />
        <Switch>
          <Route path='/' exact component={() => <Auth setPopUpState={setPopUpState} />} />
          <Route path='/dashboard' exact component={() => <Dashboard setPopUpState={setPopUpState} />} />
        </Switch>
      </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;