// import Offer from "../../assets/hero/3.jpeg"
import { OfferTexts } from "../particles/Data"
import { useCallback } from "react"
import { PiBarbellBold, PiHoodieFill, PiPersonSimpleRunFill } from "react-icons/pi";
import { Fade } from "react-awesome-reveal"

const Offer = "/static/general/hero/3.jpeg"

const Offers = () => {

    const renderIcon = useCallback((element) => {
        switch (element) {
            case 0:
                return <PiPersonSimpleRunFill size={50} color="currentColor" weight="light" />;
            case 1:
                return <PiBarbellBold size={50} color="currentColor" weight="light" />;
            case 2:
                return <PiHoodieFill size={50} color="currentColor" weight="light" />;
            default:
                return "";
        }
    }, [])

    return (
        <section className="w-full h-auto flex items-center bg-zinc-900">
            <main className="w-full lg:h-[800px] grid md:grid-cols-2 items-center gap-10 md:gap-0 lg:gap-0 ">
                <div className="w-full md:h-[800px] h-[300px] grid">
                    <img alt="Offer Image" className="w-full h-full object-cover" src={Offer} />
                </div>
                <div className="h-full w-full lg:px-10 px-4 flex flex-col lg:justify-center md:justify-end justify-center items-start md:gap-20 lg:gap-24 gap-16">
                    <Fade className="w-full">
                        <div className="w-full flex flex-col mt-10 lg:mt-24 items-center relative before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500 z-10">
                            <p className="text-amber-500 lg:text-sm text-xs tracking-widest uppercase font-medium">{OfferTexts.firstText}</p>
                            <h1 className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">{OfferTexts.secondText}</h1>
                            <h1 className="absolute text-zinc-500/10 lg:left-48 md:left-32 left-36 lg:text-9xl md:text-7xl text-6xl font-extrabold lg:-top-32 md:-top-20 -top-16 -z-10">02</h1>
                        </div>
                        <ul className="flex flex-col lg:gap-8 gap-6 pb-16">
                            {
                                OfferTexts.list.map((item, index) => (
                                    <li className="flex lg:gap-6 gap-4 items-start justify-start" key={index}>
                                        <span className="text-amber-600 ">{renderIcon(index)}</span>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-base text-zinc-200 font-semibold">{item.listCaption}</h3>
                                            <p className="text-zinc-400 text-justify">{item.text}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </Fade>
                </div>
            </main>

        </section>
    )
}

export default Offers