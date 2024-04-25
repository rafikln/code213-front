import logo from "../../public/solar_link-circle-bold.svg";
import links from "../../public/ph_link-bold.svg";
import profil from "../../public/ph_user-circle-bold.svg";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
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

const Ajouter = ({ mylist, setmylist, user, myprofil, setmyprofil,setuser }) => {
  useEffect(() => {
    setmyprofil(JSON.parse(localStorage.getItem("profil")));
    setmylist(JSON.parse(localStorage.getItem("mylist")));
    setuser(JSON.parse(localStorage.getItem("user")));

  }, []);

  const copierText = () => {
    console.log(myprofil);
    navigator.clipboard
      .writeText("localhost:5173/user/" + user.id)
      .then(() => {
        toast.success("Texte copié avec succès !");
      })
      .catch((err) => {
        toast.error("Erreur lors de la copie du texte");
      });
  };

  const navigate = useNavigate();
  //on change pour link et profile color
  const [change, setchange] = useState(1);
  //pour la ref input image--------------
  const [file, setfile] = useState();
  const ref = useRef();
  //---------------------------------------
  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const value = { ...myprofil };
      value.photo = URL.createObjectURL(event.target.files[0]);
      setmyprofil(value);
      setfile(event.target.files[0]);
      const formData= new FormData();
      formData.append("photo",file);
      formData.append("id",myprofil.userId);

      const res = await fetch("http://127.0.0.1:3000/api/photo", {
        method: "PUT",
        body: formData,
      });
  
      if (res.status === 200) {
        try {
          const data = await res.json();
          let value = { ...myprofil };
          value.photo = data.img;
          localStorage.setItem("profil", JSON.stringify(value));
          setmyprofil(value)
        } catch (error) {
          console.error("Erreur lors de la conversion de la réponse en JSON", error);
        }
      } else {
        console.error("Erreur de statut:", res.status);
      }
    }
  };

  useEffect(  () => {
    if (Object.keys(user).length == 0) {
      navigate("../login");
    }
  }, [user]);

  const update = async (e) => {
    const res = await fetch("http://127.0.0.1:3000/api/profil", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        myprofil,
        mylist: JSON.stringify(e),
        id: user.id,
      }),
    });
    if (res.status == 200) {
      const data = await res.json();
      localStorage.setItem("profil", JSON.stringify(data.myprofil));
      localStorage.setItem("mylist", data.mylist);
    }
  };

  return (
    <>
      <div className="p-[20px]  h-[100vh] flex flex-col">
        <div className="navbar bg-base-200 rounded-lg pl-[20px] pr-[30px] flex justify-between">
          <div className="flex gap-[10px]">
            <div className="avatar  ">
              <div className="w-[60px]   rounded-full   ">
                {myprofil.photo == null ? (
                  <>
                    <div className="w-[80px] h-[80px]  bg-base-100  "></div>
                  </>
                ) : (
                  <img
                    src={myprofil.photo}
                    className="w-[80px] h-[80px] rounded-[50%] "
                  />
                )}
              </div>
            </div>
            <h1 className="text-[20px] font-semibold">
              {Object.keys(user).length == 0 ? "" : user.mail}
            </h1>
          </div>
          <div className="gap-5">
            <div
              className={`flex gap-2  py-1 px-4 ${
                change == 1 ? "bg-base-100 text-primary" : "text-neutral"
              } rounded-md font-semibold `}
              onClick={() => {
                setchange(1);
              }}
            >
              <img src={links} alt="" />
              <p>Links</p>
            </div>
            <div
              className={`flex gap-1 py-1 px-4  ${
                change == 0 ? "bg-base-100 text-primary" : "text-neutral"
              } rounded-md  font-semibold  `}
              onClick={() => {
                setchange(0);
              }}
            >
              <img src={profil} alt="" />
              <p>Profile Details</p>
            </div>
          </div>
          <a
            href="../login"
            class="btn btn-outline  btn-error  w-[100px] btn-sm h-[40px]  min-h-0"
            onClick={() => {
              localStorage.removeItem("profil");
              localStorage.removeItem("mylist");
              localStorage.removeItem("user");
              navigate("../login");
            }}
          >
            Déconnexion
          </a>
        </div>
        <main className="w-[100%]   flex">
          <section className="hidden lg:flex w-[35%] h-[100%] mt-4  bg-white justify-center items-center rounded-lg ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="280"
              height="570"
              viewBox="0 0 308 632"
              fill="none"
            >
              <path
                d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
                stroke="#737373"
              />
            </svg>
            <svg
              className="absolute "
              xmlns="http://www.w3.org/2000/svg"
              width="260"
              height="550"
              viewBox="0 0 286 612"
              fill="none"
            >
              <path
                d="M1 45.5C1 20.9233 20.9233 1 45.5 1H69.5C75.8513 1 81 6.14873 81 12.5C81 20.5081 87.4919 27 95.5 27H190.5C198.508 27 205 20.5081 205 12.5C205 6.14873 210.149 1 216.5 1H240.5C265.077 1 285 20.9233 285 45.5V566.5C285 591.077 265.077 611 240.5 611H45.5C20.9233 611 1 591.077 1 566.5V45.5Z"
                fill="white"
                stroke="#737373"
              />
            </svg>
            <div className="w-[260px] h-[550px] absolute  flex flex-col ">
              <div className="w-[100%] h-[35%] flex flex-col items-center justify-center gap-3 pt-10">
                {myprofil.photo == null ? (
                  <>
                    <div class="indicator">
                      <div className="w-[80px] h-[80px] rounded-[50%] bg-base-100  "></div>
                    </div>
                  </>
                ) : (
                  <div class="indicator">
                    <div
                      class=" bg-[#d33333] w-[20px] h-[20px]  rounded-[50%] flex justify-center absolute right-[2px] "
                      onClick={() => {
                        const value = { ...myprofil };
                        value.photo = null;
                        setmyprofil(value);
                      }}
                    >
                      <span className="mt-[-2.5px] font-[500] ml-[0.5px]	text-white absolute  ">
                        X
                      </span>
                    </div>
                    <img
                      src={myprofil.photo}
                      className="w-[80px] h-[80px] rounded-[50%] border-[3px] "
                    />
                  </div>
                )}
                {myprofil.lastename && myprofil.name ? (
                  <>
                    <h1 className="text-[20px] font-[600]">
                      {myprofil.name} {myprofil.lastename}
                    </h1>
                  </>
                ) : (
                  <>
                    <div className="w-[68%] h-[15px] bg-base-100 rounded-[30px]"></div>
                  </>
                )}
                {myprofil.mail ? (
                  <>
                    <h1 className="text-[15px] text-neutral">
                      {myprofil.mail}
                    </h1>
                  </>
                ) : (
                  <div className="w-[35%] h-[15px] bg-base-100 rounded-[30px]"></div>
                )}
              </div>
              <div className=" w-full  flex-grow  px-4 pt-8  flex flex-col gap-4 ">
                {mylist.map((e, i) => {
                  if (i > 4) return;
                  return (
                    <div
                      key={i}
                      style={{ backgroundColor: color[e.value] }}
                      className={` w-full h-10  rounded-lg flex items-center pl-4 gap-3 `}
                    >
                      {mylist[i].value == "null" ? (
                        ""
                      ) : (
                        <img
                          src={img[e.value]}
                          alt=" "
                          className="w-[16px] h-[16px]"
                        />
                      )}
                      <p className="font-bold text-white">{e.value}</p>
                    </div>
                  );
                })}
                {mylist.length == 0 ? (
                  <>
                    <div className=" w-full h-10 bg-base-100  rounded-lg flex items-center pl-4 gap-3 "></div>
                    <div className=" w-full h-10 bg-base-100  rounded-lg flex items-center pl-4 gap-3 "></div>
                    <div className=" w-full h-10 bg-base-100  rounded-lg flex items-center pl-4 gap-3 "></div>
                    <div className=" w-full h-10 bg-base-100  rounded-lg flex items-center pl-4 gap-3 "></div>
                    <div className=" w-full h-10 bg-base-100  rounded-lg flex items-center pl-4 gap-3 "></div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div></div>
            </div>
          </section>
          <section className=" w-[65%] h-[100%] bg-base-200 m-4 p-9 rounded-lg relative">
            {change ? (
              <>
                <h1 className="text-[35px] font-semibold mb-1">
                  Customize your links
                </h1>
                <p className="text-[16px] text-neutral mb-8">
                  Add/edit/remove links below and then share all your profiles
                  with the world!
                </p>
                <button
                  className="btn btn-outline btn-primary w-full btn-sm h-[40px]  min-h-0 mt-3"
                  onClick={() => {
                    if (mylist.length == 13) return;
                    setmylist([
                      ...mylist,
                      {
                        value: "null",
                        url: "",
                      },
                    ]);
                  }}
                >
                  + Add new link
                </button>
                <div
                  className={`w-full h-[350px] overflow-y-auto ${
                    mylist.length != 0
                      ? ""
                      : "bg-base-100 justify-center items-center "
                  } mt-4 rounded-lg flex flex-col gap-5`}
                >
                  {mylist.length != 0 ? (
                    <>
                      {mylist.map((e, i) => {
                        return (
                          <>
                            <div className="w-[98%] min-h-[200px] bg-base-100 rounded-lg">
                              {/* top */}
                              <div className="flex justify-between px-3 pt-3">
                                <p>
                                  <span className="text-base">= </span>
                                  <span className="font-semibold text-lg ">
                                    Link #{i + 1}
                                  </span>
                                </p>

                                <span
                                  onClick={() => {
                                    const value = [...mylist];
                                    value.splice(i, 1);
                                    setmylist(value);
                                    console.log(mylist);
                                    update(value);
                                  }}
                                >
                                  {" "}
                                  Remove
                                </span>
                              </div>
                              {/* center */}
                              <label className="form-control w-full   px-3 relative">
                                <div className="label  px-3">
                                  <span className="label-text">Pmlatfor</span>
                                </div>
                                <div className="absolute top-[44px] left-5">
                                  {mylist[i].value == "null" ? (
                                    ""
                                  ) : (
                                    <img
                                      src={img[e.value]}
                                      alt=" "
                                      className="w-[16px] h-[16px]"
                                    />
                                  )}
                                </div>

                                <select
                                  onBlur={() => {
                                    update(mylist);
                                  }}
                                  value={
                                    mylist[i].value == "null"
                                      ? "Select"
                                      : mylist[i].value
                                  }
                                  onChange={(e) => {
                                    const value = [...mylist];
                                    value[i].value = e.target.value;
                                    setmylist(value);
                                  }}
                                  className="select select-bordered select-sm bg-base-200  pl-8 "
                                >
                                  <option disabled value="Select">
                                    Select
                                  </option>

                                  {options.map((e) => {
                                    return (
                                      <option
                                        disabled={
                                          !!mylist.find((element) => {
                                            return element.value == e;
                                          })
                                        }
                                        key={e.text}
                                        value={e.text}
                                      >
                                        {e}
                                      </option>
                                    );
                                  })}
                                </select>
                              </label>
                              {/* bottom */}
                              <label className="form-control w-full    px-3">
                                <div className="label  px-3 ">
                                  <span className="label-text">Platform</span>
                                </div>
                                <input
                                  disabled={
                                    mylist[i].value == "null" ? true : false
                                  }
                                  type="text"
                                  className="input input-bordered w-full bg-base-200 input-sm  px-3"
                                  onChange={(e) => {
                                    const value = [...mylist];
                                    value[i].url = e.target.value;
                                    setmylist(value);
                                  }}
                                  value={mylist[i].url}
                                  onBlur={() => {
                                    update(mylist);
                                  }}
                                />
                              </label>{" "}
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        height="100"
                        viewBox="0 0 250 161"
                        fill="none"
                      >
                        <path
                          opacity="0.3"
                          d="M48.6936 15.4213C23.3786 25.2238 4.59362 50.0679 0.857884 80.1285C-2.26282 105.459 5.19347 133.446 49.0884 141.419C134.494 156.939 222.534 158.754 242.952 116.894C263.369 75.0336 235.427 8.00293 192.079 3.36363C157.683 -0.326546 98.1465 -3.7206 48.6936 15.4213Z"
                          fill="white"
                        />
                        <path
                          d="M157.022 9.56714H93.044C89.0309 9.56714 85.7776 12.8204 85.7776 16.8336V137.744C85.7776 141.757 89.0309 145.01 93.044 145.01H157.022C161.036 145.01 164.289 141.757 164.289 137.744V16.8336C164.289 12.8204 161.036 9.56714 157.022 9.56714Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M125.033 140.872C128.174 140.872 130.72 138.326 130.72 135.185C130.72 132.044 128.174 129.498 125.033 129.498C121.892 129.498 119.346 132.044 119.346 135.185C119.346 138.326 121.892 140.872 125.033 140.872Z"
                          fill="#333333"
                        />
                        <path
                          d="M156.628 21.321H93.4314V126.78H156.628V21.321Z"
                          fill="#EFEBFF"
                        />
                        <path
                          opacity="0.03"
                          d="M117.797 120.508C118.938 120.508 119.862 119.583 119.862 118.443C119.862 117.302 118.938 116.377 117.797 116.377C116.656 116.377 115.732 117.302 115.732 118.443C115.732 119.583 116.656 120.508 117.797 120.508Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.44"
                          d="M125.033 120.508C126.174 120.508 127.099 119.583 127.099 118.443C127.099 117.302 126.174 116.377 125.033 116.377C123.893 116.377 122.968 117.302 122.968 118.443C122.968 119.583 123.893 120.508 125.033 120.508Z"
                          fill="white"
                        />
                        <path
                          opacity="0.03"
                          d="M132.269 120.508C133.41 120.508 134.335 119.583 134.335 118.443C134.335 117.302 133.41 116.377 132.269 116.377C131.129 116.377 130.204 117.302 130.204 118.443C130.204 119.583 131.129 120.508 132.269 120.508Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M148.199 32.9534H101.867V72.5051H148.199V32.9534Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M134.373 80.1285H101.867V83.7504H134.373V80.1285Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M148.199 80.1285H136.567V83.7504H148.199V80.1285Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M117.053 91.2371H101.867V94.8589H117.053V91.2371Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M148.199 91.2371H120.28V94.8589H148.199V91.2371Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M136.954 102.353H101.867V105.975H136.954V102.353Z"
                          fill="#333333"
                        />
                        <path
                          d="M78.6555 21.321H15.4592V126.78H78.6555V21.321Z"
                          fill="#EFEBFF"
                        />
                        <path
                          opacity="0.44"
                          d="M39.8251 120.508C40.9657 120.508 41.8903 119.583 41.8903 118.443C41.8903 117.302 40.9657 116.377 39.8251 116.377C38.6844 116.377 37.7598 117.302 37.7598 118.443C37.7598 119.583 38.6844 120.508 39.8251 120.508Z"
                          fill="white"
                        />
                        <path
                          opacity="0.03"
                          d="M47.0611 120.508C48.2018 120.508 49.1264 119.583 49.1264 118.443C49.1264 117.302 48.2018 116.377 47.0611 116.377C45.9205 116.377 44.9958 117.302 44.9958 118.443C44.9958 119.583 45.9205 120.508 47.0611 120.508Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M54.297 120.508C55.4376 120.508 56.3623 119.583 56.3623 118.443C56.3623 117.302 55.4376 116.377 54.297 116.377C53.1563 116.377 52.2317 117.302 52.2317 118.443C52.2317 119.583 53.1563 120.508 54.297 120.508Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M70.227 32.9534H23.8948V72.5051H70.227V32.9534Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M56.4002 80.1285H23.8948V83.7504H56.4002V80.1285Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M70.2274 80.1285H58.595V83.7504H70.2274V80.1285Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M39.0807 91.2371H23.8948V94.8589H39.0807V91.2371Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M70.2272 91.2371H42.3079V94.8589H70.2272V91.2371Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M58.9819 102.353H23.8948V105.975H58.9819V102.353Z"
                          fill="#333333"
                        />
                        <path
                          d="M234.6 21.321H171.403V126.78H234.6V21.321Z"
                          fill="#EFEBFF"
                        />
                        <path
                          opacity="0.03"
                          d="M195.769 120.508C196.91 120.508 197.834 119.583 197.834 118.443C197.834 117.302 196.91 116.377 195.769 116.377C194.629 116.377 193.704 117.302 193.704 118.443C193.704 119.583 194.629 120.508 195.769 120.508Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M203.005 120.508C204.146 120.508 205.071 119.583 205.071 118.443C205.071 117.302 204.146 116.377 203.005 116.377C201.865 116.377 200.94 117.302 200.94 118.443C200.94 119.583 201.865 120.508 203.005 120.508Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.44"
                          d="M210.242 120.508C211.382 120.508 212.307 119.583 212.307 118.443C212.307 117.302 211.382 116.377 210.242 116.377C209.101 116.377 208.176 117.302 208.176 118.443C208.176 119.583 209.101 120.508 210.242 120.508Z"
                          fill="white"
                        />
                        <path
                          opacity="0.03"
                          d="M226.171 32.9534H179.839V72.5051H226.171V32.9534Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M212.345 80.1285H179.839V83.7504H212.345V80.1285Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M226.171 80.1285H214.539V83.7504H226.171V80.1285Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M195.025 91.2371H179.839V94.8589H195.025V91.2371Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M226.179 91.2371H198.26V94.8589H226.179V91.2371Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.03"
                          d="M214.926 102.353H179.839V105.975H214.926V102.353Z"
                          fill="#333333"
                        />
                        <path
                          opacity="0.1"
                          d="M146.597 145.041C146.597 144.281 144.987 113.15 146.02 108.519C147.053 103.887 156.529 81.2447 154.031 78.6023C151.533 75.96 142.383 81.9736 142.383 81.9736C142.383 81.9736 144.054 54.7073 140.105 52.7635C136.157 50.8197 134.403 58.4354 134.403 58.4354L132.3 88.9363L121.882 144.896L146.597 145.041Z"
                          fill="#333333"
                        />
                        <path
                          d="M139.559 113.295C140.887 107.979 142.884 102.793 144.16 97.4252C145.003 93.8717 150.455 79.0199 151.981 74.6463C152.451 73.3024 152.854 71.6775 151.943 70.5841C151.635 70.2644 151.252 70.0272 150.829 69.8946C150.406 69.7619 149.956 69.7379 149.521 69.8248C148.643 70.008 147.833 70.4312 147.182 71.0473C145.663 72.3836 142.862 78.9971 140.811 78.9895C138.329 78.9895 139.498 72.1558 139.43 70.8423C139.149 65.1855 139.566 57.9342 137.357 52.6191C135.717 48.6708 131.647 49.2023 130.69 53.4696C129.733 57.7368 129.771 75.6182 129.771 75.6182C129.771 75.6182 113.887 72.8924 111.176 77.7367C108.465 82.581 113.044 113.355 113.044 113.355L139.559 113.295Z"
                          fill="#F4A28C"
                        />
                        <path
                          d="M141.495 160.5L141.206 111.594L111.525 105.079L99.574 160.5H141.495Z"
                          fill="#633CFF"
                        />
                        <path
                          opacity="0.1"
                          d="M141.495 160.5L141.206 111.594L127.038 108.481L124.502 160.5H141.495Z"
                          fill="#333333"
                        />
                      </svg>
                      <h1 className="text-4xl font-semibold">
                        Let’s get you started
                      </h1>

                      <p className="w-[60%] text-center text-neutral ">
                        Use the “Add new link” button to get started. Once you
                        have more than one link, you can reorder and edit them.
                        We’re here to help you share your profiles with
                        everyone!
                      </p>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <section className="w-full h-[95%]  ">
                  {/* top */}
                  <div className="flex flex-col gap-2 h-[20%]">
                    <h1 className="font-bold text-[35px]">Profile Details</h1>
                    <p className="text-neutral text-[20px]">
                      Add your details to create a personal touch to your
                      profile.
                    </p>
                  </div>
                  {/* bottom  */}
                  <div className="h-[80%] flex flex-col gap-8 ">
                    <div className="w-full h-[50%]  bg-base-100 rounded-[13px] flex p-4 ">
                      <div className="w-[33%] h-full flex items-center ml-6 font-[400] text-[18px] text-neutral">
                        <p>Profile picture</p>
                      </div>
                      <button
                        onClick={() => {
                          ref.current.click();
                        }}
                        className={`w-[25%] h-full  
                         bg-base-300
                        rounded-lg flex flex-col relative  justify-center items-center`}
                      >
                        <img src={imgg} alt="" width={50} />
                        <p
                          className={`${
                            myprofil.photo ? "text-white" : "text-primary"
                          } font-[600] `}
                        >
                          + Upload Image
                        </p>
                      </button>
                      <input
                        type="file"
                        className=" hidden"
                        accept="image/jpeg"
                        ref={ref}
                        onChange={onImageChange()}
                      />
                      <div className="w-[33%] h-full flex items-center  text-[15px] text-neutral p-4 font-[400] ">
                        <p>
                          Image must be below 1024x1024px. Use PNG or JPG
                          format.
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-[50%]  bg-base-100 rounded-[13px] p-3 pl-6">
                      <div className="w-full h-[33%] flex  gap-9 items-center">
                        <label className="w-[30%] text-neutral">
                          First name*
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. John"
                          value={myprofil.name}
                          className="input input-bordered w-full bg-base-200"
                          onChange={(e) => {
                            const value = { ...myprofil };
                            value.name = e.target.value;
                            setmyprofil(value);
                          }}
                          onBlur={() => {
                            update(mylist);
                          }}
                        />
                      </div>
                      <div className="w-full h-[33%] flex  gap-9 items-center">
                        <label className="w-[30%] text-neutral">
                          Last name*{" "}
                        </label>
                        <input
                          type="text"
                          value={myprofil.lastename}
                          placeholder="e.g. Appleseed"
                          className="input input-bordered  w-full  bg-base-200"
                          onChange={(e) => {
                            const value = { ...myprofil };
                            value.lastename = e.target.value;
                            setmyprofil(value);
                          }}
                          onBlur={() => {
                            update(mylist);
                          }}
                        />
                      </div>
                      <div className="w-full h-[33%] flex  gap-9 items-center">
                        <label className="w-[30%] text-neutral">Email</label>
                        <input
                          type="text"
                          value={myprofil.mail}
                          placeholder="e.g. email@example.com"
                          className="input input-bordered   w-full bg-base-200"
                          onChange={(e) => {
                            const value = { ...myprofil };
                            value.mail = e.target.value;
                            setmyprofil(value);
                          }}
                          onBlur={() => {
                            update(mylist);
                          }}
                        />
                      </div>
                      <div className="w-full h-[33%] "></div>
                      <div className="w-full h-[33%]"></div>
                    </div>
                  </div>
                </section>
              </>
            )}

            <button
              className="btn btn-success text-white  w-[100px] btn-sm h-[40px]  min-h-0 absolute right-10 bottom-3 mt-7"
              onClick={async () => {
                copierText();
              }}
            >
              Copy Link
            </button>
          </section>
        </main>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={20}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          success: {
            style: {
              background: "white",
              color: "green",
            },
          },
          error: {
            style: {
              background: "white",
              color: "red",
            },
          },
        }}
      />
    </>
  );
};
export default Ajouter;
