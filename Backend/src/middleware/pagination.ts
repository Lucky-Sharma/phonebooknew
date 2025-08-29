import { type Response ,type Request,type NextFunction } from "express"

export const paginationMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    
    const page = Math.max(parseInt(req.query.page as string)|| 1);
    const limit = Math.max(parseInt(req.query.limit as string)|| 5);

    (req as any).pagination={page,limit,skip:(page-1)*limit}
    next()
}