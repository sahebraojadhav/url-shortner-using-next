import UrlShortnerService from "@/services/UrlShortnerService";
import { revalidatePath } from "next/cache";

export const shortenUrl=async (FormData:FormData)=>{
    'use server'

    const originalUrl:string=FormData.get('originalUrl') as string;
    console.log('Original URL passed is ',originalUrl);
    const shortenerService=new UrlShortnerService();
    const shortUrl=await shortenerService.shortenUrl(originalUrl);
    revalidatePath('/urls');
}