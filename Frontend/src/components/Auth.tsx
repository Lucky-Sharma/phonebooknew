import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect ,useState} from "react";

interface Authprops {
  onSuccess:()=> void
}

export const Auth = ({onSuccess}:Authprops) => {
    const [name,setName] = useState("");
    const [pass,setPassword] = useState("");

    const getjwt = async(name:string,password:number)=>{
        const response = await fetch('/api/signin',{
            method:"post",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                name:name,
                password:password
            })
        })
        const {token}= await response.json();
        if(token){
          localStorage.setItem("token",token);
          onSuccess();
        }
        else{
          alert("Invalid credentials")
        }
        console.log(token);
    }

    function submitHandler(){
       getjwt(name,Number(pass));
       
    }
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "150px",
      }}
    >
      <Card sx={{ minWidth: 275, padding: "100px", border:"solid 2px #191970"}}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "30px"}}
        >
          <Typography variant="h3" gutterBottom>
           Authentication
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue="Name..."
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            defaultValue="password"
            value={pass}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <Button variant="outlined" onClick={submitHandler}>Submit</Button>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};
