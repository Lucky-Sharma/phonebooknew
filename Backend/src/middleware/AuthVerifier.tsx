import type { NextFunction ,Request,Response} from "express";
import jwt from 'jsonwebtoken';

interface myjwt{
    name:string,
    password: number
}
export const AuthVerifier = (req:Request,res:Response, next:NextFunction)=>{

     const header = req.header("Authorization") || "";
     if(!header){
        res.status(400).json({message:"send the header"})
     }
     try{
        const result = jwt.verify(header,'1234') as myjwt;

     const All_user = [
  {name:'lucky',
    password:123
  },
  {name:'prateek',
    password:456
  },
  {name:'rahul',
    password:789
  },
  {name:'yash',
    password:101
  },
]
    if(All_user.find((e)=> e.name==result.name && e.password === result.password)){
        console.log("header ferom midd..................:",result);
        next();
    }
    else{
        return res.status(403).json({message:"Invalid token or user not found"})
    }

     }
    catch(err){
        console.log("JWT error: ",err);
        return res.status(401).json({message:"invalid token"})
    }
}