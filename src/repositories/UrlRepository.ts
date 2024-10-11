import Url,{IUrl} from "@/models/Url";
import connectDB from "@/config/db";

export default class UrlRepository{
    private urlModel;
    constructor(){
        connectDB();
        this.urlModel=Url;
    }

    async getUrlById(id:string):Promise<IUrl | null>{
        return await this.urlModel.findById(id).lean();
    }

    async getUrlByShortUrl(shortUrl:string):Promise<IUrl | null>{
        return await this.urlModel.findOne({shortUrl}).lean();
    }

    async getUrlByOriginalUrl(originalUrl:string):Promise<IUrl | null>{
        return await this.urlModel.findOne({originalUrl}).lean();
    }

   async getAllUrls():Promise<IUrl[]>{
    const response= await this.urlModel.find().lean();
    console.log("response from repoistory layer",response);
    return response;
}

   async deleteUrl(id:string):Promise<IUrl | null>{
    return await this.urlModel.findByIdAndDelete(id).lean();
    }

    async createUrl(originalUrl : string,shortUrl:string):Promise<IUrl | null>{
        return await this.urlModel.create({shortUrl,originalUrl});
    }

    //todo Add the update Url  
}
