// import ContactImg from "../../assets/gym/4.jpeg"
// import { Text } from "../atoms/Text"
import { ContactTexts } from "../particles/Data"

const ContactImg = "/static/general/gym/4.jpeg"

const Contact = () => {
    return (
        <section className="w-full md:h-[400px] h-[500px] relative">
            <img alt="Contact Image" className="w-full h-full object-cover object-top" src={ContactImg} />
            <div className="w-full h-full absolute top-0 left-0 bg-zinc-900/70 flex flex-col justify-center items-center gap-2">
                <p className="tracking-widest text-amber-500 uppercase md:text-sm text-xs font-medium">
                    {ContactTexts.firstText}
                </p>
                <h1 className="lg:text-5xl md:text-4xl text-3xl text-zinc-100">
                    {ContactTexts.phone}
                </h1>
                <p className="text-zinc-100 md:w-1/2 w-4/5 text-center text-lg my-6">
                    {ContactTexts.paragraph}
                </p>
                <button className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-red-500 to-amber-500" type="button">
                    {ContactTexts.button}
                </button>
            </div>
        </section>
    )
}

export default Contact