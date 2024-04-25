import { useState, useEffect } from "react";
import "./link.css";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";
import imgg from "./icone/ph_image.svg";
import GitHub from "../../public/teenyicons_github-solid (1).svg";
import Youtube from "../../public/ri_youtube-fill.svg";
import LinkedIn from "../../public/mdi_linkedin.svg";
import Codepen from "./icone/Codepen.svg";
import Codewars from "./icone/Codewars.svg";
import Devto from "./icone/Devto.svg";
import Facebook from "./icone/Facebook (2).svg";
import freeCodeCamp from "./icone/freeCodeCamp.svg";
import GitLab from "./icone/GitLab.svg";
import Hashnode from "./icone/Hashnode.svg";
import StackOverflow from "./icone/StackOverflow.svg";
import Twitch from "./icone/Twitch.svg";
import Twitter from "./icone/Twitter.svg";
import { Card, Typography } from "@material-tailwind/react";

const color = {
  GitHub: "#1A1A1A",
  Youtube: "#EE3939",
  LinkedIn: "#2D68FF",
  Codepen: "#1A1A1A",
  Codewars: "#8A1A50",
  Devto: "#333333",
  Facebook: "#2442AC",
  freeCodeCamp: "#302267",
  GitLab: "#EB4925",
  Hashnode: "#0330D1",
  StackOverflow: "#EC7100",
  Twitch: "#EE3FC8",
  Twitter: "#43B7E9",
};
const img = {
  GitHub: GitHub,
  Youtube: Youtube,
  LinkedIn: LinkedIn,
  Codepen: Codepen,
  Codewars: Codewars,
  Devto: Devto,
  Facebook: Facebook,
  freeCodeCamp: freeCodeCamp,
  GitLab: GitLab,
  Hashnode: Hashnode,
  StackOverflow: StackOverflow,
  Twitch: Twitch,
  Twitter: Twitter,
};

const options = [
  "GitHub",
  "Youtube",
  "LinkedIn",
  "Codepen",
  "Codewars",
  "Devto",
  "Facebook",
  "freeCodeCamp",
  "GitLab",
  "Hashnode",
  "StackOverflow",
  "Twitch",
  "Twitter",
];
const Vieux = () => {
  const { id } = useParams();
  const [profil, setprofil] = useState({});
  const [tab, settab] = useState([]);
  const [mail,setmail]=useState("");
  useEffect(() => {
    if (id) {
      const reponsePromise = fetch("http://localhost:3000/api/user/" + id);
      reponsePromise.then((response) => {
        const jsonPromise = response.json();
        jsonPromise.then((t) => {
          console.log(JSON.parse(t.links.lien));
          settab(JSON.parse(t.links.lien));
          console.log(profil);
          setprofil(t.profil);
          setmail(t.mail);
        });
      });
    }
  }, [id]);
  let m = 0;
  const navigate = useNavigate();
  if (tab.length == 0 || !mail || !profil.name ||! profil.lastename) {
    m = 1;
  }

  return (
    <>
     {m==1 ? 
     <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
     <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
         <div class="relative">
             <div class="absolute">
                 <div class="">
                     <h1 class="my-2 text-gray-800 font-bold text-2xl">
                     Le profil de cet utilisateur n'est pas complet en termes d'informations
                                          </h1>
                     <p class="my-2 text-gray-800">Vollez contacter utilisateur
</p>
                     <button class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">{mail}</button>
                 </div>
             </div>
             <div>
                 <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
             </div>
         </div>
     </div>
     <div>
         <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
     </div>
 </div>
    :
    <main className="w-full h-[100vh]  flex relative ">
    <section className="w-[65%] h-full relative bg-primary ">
      <div className="w-[80%] h-[200px] bg-white absolute top-[270px] left-10 flex p-3 gap-6 rounded-3xl">
        <div className="avatar h-[100%]">
          <div className="w-[150px] rounded-xl">
            <img src={profil.photo} />
          </div>
        </div>
        <div classNam=" w-[80%]  ">
          <h1 className="text-[55px] font-semibold	mb-3 ">
            {profil.lastename} {profil.name}
          </h1>
          <div className="flex  items-center gap-3 ml-4 font-medium text-[#4d4d4d]">
            <svg
              className="w-8 h-8 text-gray-800 dark:text-white  "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 5.6V18c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V5.6l-.9.7-7.9 6a2 2 0 0 1-2.4 0l-8-6-.8-.7Z" />
              <path d="M20.7 4.1A2 2 0 0 0 20 4H4a2 2 0 0 0-.6.1l.7.6 7.9 6 7.9-6 .8-.6Z" />
            </svg>

            <h3 className="text-[25px]	">{profil.mail}</h3>
          </div>
        </div>
      </div>
      <div className="w-[150px] h-[150px] bg-[#f4f4f4] absolute left-[699px] top-[290px] rounded-2xl flex justify-center items-center">
        <QRCode value={`http://localhost:5173/user/${id}`} />
      </div>
    </section>
    <section className="w-[50%] h-full  bg-white relative pl-[60px] pt-[30px]">
      <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[15px] rounded-[2.3rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px] ">
        <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="bg-white rounded-[2rem] pt-[1px] box-border ">
          <div class=" w-[95%] rounded-[2rem] overflow-hidden h-[380px] md:h-[654px] bg-white dark:bg-gray-800 pt-10  pl-9 pr-3  overflow-y-auto ">
            {tab.map((e) => {
              return (
                <>
                  <Link
                    style={{ backgroundColor: color[e.value] }}
                    target="_blank"
                    to={e.url}
                    className="w-full h-16 bg-[#2442AC] rounded-2xl mb-3 flex border-box p-4"
                    onClick={() => {}}
                  >
                    <img src={img[e.value]} alt="" className="mr-3" />
                    <p className="text-[20px] font-semibold text-white ">
                      {e.value}
                    </p>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  </main>
    
    }
    </>
  );
};

export default Vieux;
