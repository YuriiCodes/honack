import { CreateProjectForm } from "../components/CreateProjectForm/CreateProjectForm";
import { JoinProjectForm } from "../components/JoinProjectForm/JoinProjectForm";

export const ChooseTeam = () => {
  return (
    <div className="flex w-full h-2/6 mt-3 place-items-center">
      <div className="h-20 flex-grow card rounded-md place-items-center ">
        <h2 className={"text-4xl"}>I want to create a project </h2>
        <CreateProjectForm />
      </div>
      <div className="divider divider-horizontal">OR</div>

      <div className="h-20 flex-grow card rounded-md place-items-center">
        <h2 className={"text-4xl"}>I want to join the project </h2>
        <JoinProjectForm />
      </div>
    </div>
  );
};
