// import { Text } from "../atoms/Text"
// import { Card } from "../molecules/Card"
import { BlogTexts } from "../particles/Data"
// import Image1 from "../../assets/gym/6.jpeg";
// import Image2 from "../../assets/gym/11.jpeg"
// import Image3 from "../../assets/gym/12.jpeg"
import { useCallback } from "react";
// import { Image } from "../atoms/Image";
import { Link } from "react-router-dom";
import { PiChatsCircleFill, PiClock } from "react-icons/pi";

const Image1 = "/static/general/gym/6.jpeg";
const Image2 = "/static/general/gym/11.jpeg"
const Image3 = "/static/general/gym/12.jpeg"

const Blogs = () => {

    const renderImage = useCallback((element) => {
        switch (element) {
            case 0:
                return Image1;
            case 1:
                return Image2;
            case 2:
                return Image3;
            default:
                return "";
        }
    }, [])

    return (
        <section className="w-full h-auto flex items-center bg-zinc-900">
            <main className="w-full lg:h-[900px] md:h-[800px] flex flex-col justify-center items-center gap-20 lg:gap-28 py-12 md:py-0">

                <div className="flex flex-col mt-10 items-center relative before:absolute before:-bottom-6 before:left-30 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500 z-10">
                    <p className="text-amber-500 lg:text-sm text-xs tracking-widest uppercase font-medium">{BlogTexts.firstText}</p>
                    <h1 className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">{BlogTexts.secondText}</h1>
                    <h1 className="absolute text-zinc-500/20 lg:left-24 left-20 lg:text-9xl md:text-7xl text-6xl font-extrabold lg:-top-32 md:-top-20 -top-16 -z-10">06</h1>
                </div>

                {/* Blog News */}
                <div className="w-full lg:w-3/4 grid md:grid-cols-3 lg:gap-8 md:gap-5 gap-8 px-6 md:px-4 lg:px-0">
                    {
                        BlogTexts.blogNews.map((blog, index) => (
                            <div key={index} className="flex flex-col justify-between bg-zinc-950 border-b-4 border-red-500">
                                <img alt={blog.title} className="w-full h-48 object-cover" src={renderImage(index)} />
                                <Link to="/" className="flex flex-col lg:p-6 md:p-4 p-6 gap-2 group">
                                    <h3 className="text-amber-500 text-xs group-hover:underline font-semibold uppercase">{blog.caption}</h3>
                                    <h1 className="text-zinc-300 group-hover:underline text-base capitalize">{blog.title}</h1>
                                    <p className="text-zinc-400 text-sm">{blog.paragraph.slice(0, 155) + '...'}</p>

                                </Link>
                                <div className="flex justify-between lg:px-6 md:px-4 px-6 pb-6 items-center">
                                    <aside className="flex items-center gap-2">
                                        <span className="text-zinc-400 text-xs flex items-center gap-1 border-r border-zinc-400 pr-2">
                                            <PiClock size={15} color="currentColor" />
                                            {blog.time}
                                        </span>
                                        <span className="text-zinc-300 capitalize text-xs">
                                            {blog.author}
                                        </span>
                                    </aside>
                                    <span className="text-zinc-400 text-xs flex items-center gap-0.5">
                                        <PiChatsCircleFill size={15} color="currentColor" />
                                        {blog.comments}
                                    </span>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </main>

        </section>
    )
}

export default Blogs