
import logo from "../../public/solar_link-circle-bold.svg";
import lock from "../../public/ph_lock-key-fill.svg";
import en from "../../public/ph_envelope-simple-fill.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
const Li = (props) => {
  return (
    <>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">{props.nom}</span>
        </div>
        <div className="w-full  relative">
          <img
            src={props.img}
            alt=""
            className="absolute w-7 top-[11px] left-[8px]"
          />
          
          <input
            type={props.nom=="Password" ||    props.nom=="Confirm password" ? "password" : "text"}
            placeholder={props.pl}
            className="pl-[60px] input input-bordered bg-white w-full text-[20px] "  onChange={(e)=>
              {
               if(props.mail) props.mail(e.target.value)
              }} />
        </div>
        
      </label>
    </>
  );
};



const Singup=(props)=>
{

  const [mail,setmail]=useState("");
  const [password,setpassword]=useState("")
const mai=(e)=>{
setmail(e);
}
const pass=(e)=>{
  setpassword(e);
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!Object.keys(props.user).length == 0) {
      navigate("../ajouter");
    }
  }, [props.user]);
    return(
<>
<div className=" w-full h-screen bg-base-100">
        <div className=" w-[476px]   m-auto mt-[20px]    ">
          {/* top */}
          <div className="w-full flex bg-base-100  justify-center  h-[70px] ">
            <img src={logo} alt="" className="h-[70%]" />
            <h1 className=" font-bold font-sans text-4xl">devlinks</h1>
          </div>

          {/* bottom */}
          <div className=" ">
            {/* taitle */}
            <div className="pl-[40px] bg-base-200  rounded-t-lg mb-[-30px]">
              <h1 className="font-bold text-[55px] mb-3 ">Create account</h1>
              <p className=" text-neutral text-[18px]">
              Let’s get you started sharing your links!
              </p>
            </div>
            {/* input */}
            <form action="" className="w-full flex flex-col gap-5 mt-[30px] bg-base-200  p-[30px] ra"  onSubmit={async(e)=>
            {
              e.preventDefault();
              const res = await fetch("http://127.0.0.1:3000/api/singUp", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({mail, password }),
              });
              if (res.status == 200) {
                const data = await res.json();
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("profil", JSON.stringify(data.profil));
                localStorage.setItem("mylist", JSON.stringify([]));

             
                navigate("../ajouter")
             
              }
              if (!res.ok) {
                const data = await res.json();
                toast.error(data.message);
              }
         

            
            }} >
              <Li nom="Email address" pl="e.g. alex@email.com" img={en}  mail={mai} />
              <Li nom="Password" pl="Enter your password" img={lock}   mail={pass} />
              <Li nom="Confirm password" pl="Enter your password" img={lock}  />
              <button className="btn btn-primary text-base mt-6">Create new account</button>
              <p className="text-center text-lg ">
              Already have an account?   <Link to='../login'><span className="text-primary font-semibold">Login</span></Link>
            </p>
            </form>
           
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 3500,
          style: {
            background: "#fff",
            color: "red",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

</>
    )
}
export default Singup;