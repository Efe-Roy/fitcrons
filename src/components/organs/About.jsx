import { Fade } from "react-awesome-reveal";
// import Image1 from "../../assets/gym/2.jpeg";
// import Image2 from "../../assets/gym/3.jpeg";
// import Image3 from "../../assets/gym/4.jpeg";
// import Image4 from "../../assets/gym/5.jpeg";
import { AboutTexts } from "../particles/Data";

const Image1 = "/static/general/gym/2.jpeg";
const Image2 = "/static/general/gym/3.jpeg";
const Image3 = "/static/general/gym/4.jpeg";
const Image4 = "/static/general/gym/5.jpeg";

const About = () => {
    return (
        <section className="w-full h-auto flex items-center bg-zinc-950">
            <main className="w-full md:h-[700px] grid md:grid-cols-2 items-center lg:mx-20 md:mx-10 mx-6 gap-10 md:gap-10 py-12 md:py-0">
                <div className="h-full w-full md:order-1 order-2 flex flex-col justify-center items-start gap-4 pb-8 md:pb-12">
                    <Fade>
                        <div className="flex flex-col mt-10 items-start relative before:absolute before:-bottom-6 before:left-0 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500 z-10">
                            <p className="text-amber-500 lg:text-sm text-xs tracking-widest uppercase font-medium">{AboutTexts.firstText}</p>
                            <h1 className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">{AboutTexts.secondText}</h1>
                            <h1 className="absolute text-zinc-500/20 md:-left-3 left-0 lg:text-9xl md:text-7xl text-6xl font-extrabold lg:-top-36 md:-top-20 -top-16 -z-10">01</h1>
                            Fade</div>
                        <h2 className="text-zinc-200 mt-10 mb-4 text-lg">{AboutTexts.caption}</h2>
                        <p className="text-zinc-400 text-justify text-base">{AboutTexts.paragraph1}</p>
                    </Fade>
                </div>
                <div className="w-full md:h-[400px] h-[300px] md:order-2 order-1 grid grid-cols-3 grid-rows-3">
                    <img alt="Welcome Image" className="col-span-3 row-span-2 w-full h-full object-cover" src={Image1} />
                    <img alt="Welcome Image" className="w-full h-full object-cover" src={Image2} />
                    <img alt="Welcome Image" className="w-full h-full border border-amber-500 object-cover" src={Image3} />
                    <img alt="Welcome Image" className="w-full h-full object-cover" src={Image4} />
                </div>
            </main>

        </section>
    )
}

export default About