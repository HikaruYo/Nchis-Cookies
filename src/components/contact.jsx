import { AiFillInstagram } from "react-icons/ai"
import { IoMdMail } from "react-icons/io"
import { IoLogoWhatsapp } from "react-icons/io"

const contact = () => {
  return (
    <div id="contact us" className="py-16">
      <div className="md:mx-36 text-white">
        <h1 className="text-2xl text-start mx-6 font-bold py-8 pt-10">
          Contact Us
        </h1>
        <div className="flex flex-col md:flex-row md:space-y-0 space-y-8 py-8 space-x-10 lg:space-x-36">
          {/* Left */}
          <div className="flex lg:justify-center text-start mx-14 lg:mx-0 pl-4 text-md lg:text-xl w-full md:w-1/3">
            <ul className="list-disc space-y-4">
              <li className=""><a href="#home">Home</a></li>
              <li className=""><a href="#about">About</a></li>
              <li className=""><a href="#product">Product</a></li>
              <li className=""><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          {/* Center */}
          <div className="text-md lg:text-xl space-y-6 w-full md:w-1/3">
            {/* Instagram */}
            <div className="flex items-center lg:space-x-8 space-x-2">
              <AiFillInstagram className="h-8 w-8" />
              <p>@nchiscookies</p>
            </div>
            {/* Mail */}
            <div className="flex items-center lg:space-x-8 space-x-2">
              <IoMdMail className="h-8 w-8" />
              <p>chachaius@yahoo.com</p>
            </div>
            {/* WhatsApp */}
            <div className="flex items-center lg:space-x-8 space-x-2">
              <IoLogoWhatsapp className="h-8 w-8" />
              <p>+62 85701557609</p>
            </div>
          </div>
          {/* Right */}
          <div className="space-y-6 w-full md:w-1/3 text-md lg:text-lg">
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
            <p>Need Help? <a href="#contact" className="underline">Contact Us</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default contact