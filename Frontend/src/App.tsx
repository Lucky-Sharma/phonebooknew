import { Container } from "@mui/material";
import { MainBoard } from "./MainBoard";
import {Auth} from './components/Auth'
import { useEffect, useState } from "react";
function App() {
  const [isAuthenticate,setAuthenticate] = useState(false);

  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(token && token!=='undefined' && token!=='null'){
      setAuthenticate(true);
    }
  },[])

  return (
    <Container>
    {
      isAuthenticate?(
        <MainBoard />
      ):(
        <Auth onSuccess={()=>setAuthenticate(true)}/>
      )}
    
    </Container>
  );
 
}

export default App;
