import { CreateProjectForm } from "../components/CreateProjectForm/CreateProjectForm";

export const ChooseTeam = () => {
  return (
    <div className="flex w-full h-full mt-3">
      <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
        <h2 className={"mb-8"}>I want to create a project </h2>
        <div className={"mt-5"}>
          <CreateProjectForm />
        </div>
      </div>
      <div className="divider divider-horizontal">OR</div>
      <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">I want to join the project
      </div>
    </div>
  );
};
