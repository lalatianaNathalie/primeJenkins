import { IoCall } from "react-icons/io5";
import "./ContactI.css";
import sary from "./ccc-removebg-preview.png";
import { email, adr, tel } from "../../../constants/Coordonee";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../axiosInstance";
const ContactInt = () => {
  const { t } = useTranslation();
  const [isLoad, setIsLoad] = useState(false)
  const [state, setState] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async(e)=>{
  e.preventDefault()
  setIsLoad(true)
    await  api.post("/message/", state)
    .then((res)=>{
      // console.log(res);
      if(res.status === 200){
        setIsLoad(false);
        setState({
          nom: "",
          email:"",
          message:""
        } )    
        toast.success("Votre message est bien envoyé") 
      }                 
    })
    .catch ((error)=> {
      console.error("Error submitting data:", error);
      toast.error("Error :  Votre message n'est pas envoyé")
    })
    .finally(()=>setIsLoad(false))
}

  return (
    <div className="cadre">
      <div className="formulaire">
        <h2 className="primaryText">{t("contactPage.title")}</h2>
        <p className="secondaryText mb-4">{t("contactPage.description")}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              required
              onChange={inputHandle}
              value={state.email}
              name="email"
              placeholder={t("contactPage.emailPlaceholder")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              required
              name="nom"
              value={state.nom}
              onChange={inputHandle}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t("contactPage.namePlaceholder")}
            />
          </div>
          <div className="mb-3">
            <textarea
              onChange={inputHandle}
              required
              name="message"
              value={state.message}
              id="message"
              rows="4"
              placeholder={t("contactPage.messagePlaceholder")}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <button className=" btn" type="submit">
            {isLoad === true ?(<span className="spinner"></span>):( t("contactPage.send"))}
          </button>
        </form>
      </div>
      <div className="image flexColCenter">
        <img src={sary} alt="" />
        <div className="info flexColStart">
          <span className="im-contact">
            <span className="icon ">
              <FaLocationDot />
            </span>
            <span className="secondaryText">{adr}</span>
          </span>
          <span className="im-contact">
            <span className="icon ">
              <SiGmail />
            </span>{" "}
            <span className="secondaryText">{email}</span>
          </span>
          <span className="im-contact">
            <span className="icon ">
              <IoCall />
            </span>{" "}
            <span className="secondaryText">{tel}</span>{" "}
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactInt;
