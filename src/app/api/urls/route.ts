import UrlShortnerService from "@/services/UrlShortnerService";
import { NextResponse } from "next/server";
import {cache} from "react"

const fetchUrls=cache(async()=>{
    const urlShortnerService=new UrlShortnerService();
    const response=urlShortnerService.getAllUrls();
    return response;
})

export async function GET(){
  const urls=await fetchUrls();
  console.log(urls);
  const response=NextResponse.json({urls});
  response.headers.set('Cache-control','public,max-age=180 s-maxage-180,stale-while-revalidate=59');
  return response;
} 