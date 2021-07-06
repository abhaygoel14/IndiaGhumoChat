import React,{useEffect} from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat"
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import {auth} from '../src/components/firebase'

function App() {
  const user=useSelector(selectUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log('user is',authUser)

      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          email:authUser.email,
          displayName:authUser.displayName,
          photo:authUser.photoURL
        }))
      } 
      else{
        dispatch(logout())
      }
  })
},[dispatch])
 
return (
    <div className="App">
    { user ? (<> <Sidebar />
    <Chat /> </>) : (<Login />)}
    </div>
  );
}

export default App;
