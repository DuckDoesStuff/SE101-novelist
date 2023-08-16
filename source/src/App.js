import React from 'react';
import './App.css';
import './styles/styles.css';
import SignUp from './components/SignUp/SignUp';
// import EditNovelPage from './pages/EditNovelPage';
import SignInPage from './pages/signin';
// import { AuthContextProvider } from './auth/authContext';

function App() {
  return (
    // <AuthContextProvider>
    //   <navbar>
    //     <routes>
    //       <route path='/' element = {<Home />} />
    //       <route path='/login' element = {<Home />} />
    //     </routes>
    //   </navbar>
    // </AuthContextProvider>
    <div>
      <SignUp novelID={"custom_key"}/>
    </div>
  );
}

export default App;
