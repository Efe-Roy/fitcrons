import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const StickyIcons = () => {
    return (
        <section className="fixed lg:bottom-0 bottom-1/2 left-0  flex flex-col gap-5 items-center bg-gradient-to-t z-40 from-red-500 to-amber-500 rounded-e-lg py-3 px-2 ">
            <a href="/" className="text-zinc-100 hover:text-zinc-900">
                <FaFacebook />
            </a>
            <a href="/" className="text-zinc-100 hover:text-zinc-900">
                <FaTwitter />
            </a>
            <a href="/" className="text-zinc-100 hover:text-zinc-900">
                <FaYoutube />
            </a>
            <a href="/" className="text-zinc-100 hover:text-zinc-900">
                <FaInstagram />
            </a>
        </section>
    )
}

export default StickyIcons