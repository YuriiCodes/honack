import React from "react";
import { Link } from "react-router-dom";

const Guide = () => {
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <div className={"p-5"}>
        <h1 className={"text-6xl mt-52 text-center"}>
          How does Honack work?
        </h1>
        <ul className="steps steps-vertical text-xl mt-10">
          <li className="step step-primary my-10">
            <div><span className={"font-bold"}>Register. </span>Firstly, you have to sign up.</div>
          </li>
          <li className="step ">
            <div><span className={"font-bold"}>Create a project. </span>Then, create a project you want to
              manage
            </div>
          </li>
          <li className="step">
            <div><span className={"font-bold"}>Create iteration. </span> After you've successfully created the
              project, create your first iteration!
            </div>
          </li>
          <li className="step">
            <div><span className={"font-bold"}>Manage members. </span>After you've finished setting up your
              project, invite your teammates & set up their salary!
            </div>
          </li>
          <li className="step">
            <div><span className={"font-bold"}>Enjoy! </span>You've set everything up. Now enjoy managing your
              projects & calculating honest salaries at ease.
            </div>
          </li>
        </ul>
        <div>
          <Link to={"/register"}>
            <button className={"btn btn-primary w-full btn-lg"}>
              sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Guide;
