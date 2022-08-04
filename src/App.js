import logo from './logo.svg';
import './App.css';
import { AppRouter } from './AppRouter';
import { createContext, useCallback, useState } from 'react';
import env from "react-dotenv";

export const Context = createContext(null)

function App() {  
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState('@mail.ru')
  const [group, setGroup] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userAcc, setUserAcc] = useState({
    displayName: "",
    email: "",
    creationTime:"Sat, 30 Jul 1899 19:46:14",
    photoURL:"https://sun1-85.userapi.com/s/v1/if1/9TZJWBsPFYaFtM5UtbzjzSSYX2FfoLd7_jWzBdlkE6xBhyiL0DhLuYuwshlGilQZEYcDMI-I.jpg?size=200x200&quality=96&crop=20,20,200,200&ava=1",
    myGroup:[]
  })
  return (
    <Context.Provider
      value={{
        isAuth:isAuth, setIsAuth:setIsAuth,
        user:user, setUser: setUser,
        userAcc:userAcc, setUserAcc:setUserAcc,
        group, setGroup, isLoading, setIsLoading
      }}
    >
      <AppRouter/>
    </Context.Provider>
  );
}

export default App;
