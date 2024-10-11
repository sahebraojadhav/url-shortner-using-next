import Link from "next/link";

async function fetchUrls() {
    const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`)

    if(!response.ok){
        throw new Error('failed to fetch urls');
    }
    console.log(response);
    return response.json();
}

export default async function UrlList(){
    let urls;
    try{
        urls=await fetchUrls();
        console.log(urls);
    }catch(error){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-10 bg-white rounded-lg shadow-2xl max-w-4xl w-full">
                    <h1 className="text-3xl font-bold mg-6 text-center text-gray-700">Error</h1>
                    <p className="text-center text-red-500">Failed to load urls</p>
                </div>
            </div>
        )
    }

    return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-10 bg-white rounded-lg shadow-2xl max-w-4xl w-full">
                <h1 className="text-3xl font-bold mb-6 text-clip text-gray-700 text-center">All short Urls</h1>
                <Link href="/" className='text-gray-800'> Go To HOme page </Link>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Original URl</th>
                                <th>Short Url</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls?.urls?.map((url:{_id:string,originalUrl:string,shortUrl:string})=>{
                                return (
                                    <tr key={url._id}>
                                        <td>{url.originalUrl}</td>
                                        <td>
                                            <a 
                                            href={`/${url.shortUrl}`}
                                            target="_blank"
                                            className="link link-primary"
                                            >
                                                {`${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortUrl}`}</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
       </div> 
    )
}