import { link } from "fs";
import prisma from "../config/prisma.js";

export const insertUser = async (
  name: string,
  phoneno: string,
  address: string,
  label: string,
  imgsrc: string | null
) => {
  return await prisma.contacts.create({
    data: { name, phoneno, address, label, imgsrc: imgsrc ?? null },
  });
};

export const 
getAllContacts = async (skip:any, take:any) => {
  const data = await prisma.contacts.findMany({
    orderBy:{bookmark:'desc'},
    skip,
    take,
  });

  const total = await prisma.contacts.count(); 

  return { skip, take, data, total };
};

export const deleteData = async (id: number) => {
  try {
    return await prisma.contacts.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log("error from deleteData from prisma");
  }
};
export const getsearchdata = async (name?: string, filter?: string , skip = 0 , take = 7) => {
  try {
    
    const where: any = {};
    if(name){
      where.name={
          startsWith: name,
          mode:'insensitive'
      }
    }
    if (filter) {
      where.label = filter;
    }

    const [data, total] = await Promise.all([
      prisma.contacts.findMany({
        where: Object.keys(where).length ? where : undefined,
        skip,
        take,
        orderBy:{bookmark:'desc'}
      
      }),
      prisma.contacts.count({
        where: Object.keys(where).length ? where : undefined,
      }),
    ]);

    return {data,total};
  } catch (err) {
    console.log("error from getsearchdata", err);
    throw err
  }
};

export const editdata = async (
  id: number,
  phoneno: string,
  name: string,
  label: string,
  address: string
) => {
  try {
    const updatedata = await prisma.contacts.update({
      where: { id },
      data: {
        name,
        phoneno,
        label,
        address,
      },
    });
    return updatedata;
  } catch (err) {
    console.log("error from editdata prisma");
  }
};

export const changeBookmark = async (id:number)=>{
 try{
  const contact = await prisma.contacts.findUnique({where:{
    id:id
  }})

  if(!contact){
    throw new Error("contact not found");
  }
  
  const update = await prisma.contacts.update({
    where:{id},
    data:{
      bookmark: !contact.bookmark,
    }
  })
  return update;
 }catch(err){
    console.log("error from changeBookmark",err)
 }
}
