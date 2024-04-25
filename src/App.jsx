import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./page/login";
import L from "./page/l";
import Singup from "./page/singup";
import Ajouter from "./page/ajouter";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Vieux from "./page/vieux";

function App() {
  const [mylist, setmylist] = useState([]);
  const [myprofil, setmyprofil] = useState({
    name:"",
    lastename:"",
    mail : "",
    photo : null
  });
  
  const [user, setuser] = useState({});

  useEffect(() => {
    const v = JSON.parse(localStorage.getItem("user"));
    if (v) setuser(v);
  }, []);

  
  return (
    <>
      <Routes>
        
        <Route
          path="/login"
          element={<Login setuser={setuser} user={user}  myprofil={myprofil}  setmyprofil={setmyprofil}  setmylist={setmylist} />}
        />
          <Route
          path="/l"
          element={<L setuser={setuser} user={user}  myprofil={myprofil}  setmyprofil={setmyprofil}  setmylist={setmylist} />}
        />
        <Route path="/sing-up" element={<Singup  setuser={setuser} user={user}  myprofil={myprofil}  setmyprofil={setmyprofil} />} />
        <Route
          path="/ajouter"
          element={
            <Ajouter mylist={mylist} setmylist={setmylist} user={user} setuser={setuser}  myprofil={myprofil}  setmyprofil={setmyprofil} />
          }
        />
          <Route path="/user/:id" element={<Vieux  />} />
      
      </Routes>
     
    </>
  );
}

export default App;
