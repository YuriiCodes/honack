import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";

const Hero = () => {
  const user = useAuthStore((state) => state.user);
  return (
    // <div className="hero min-h-screen" style={{ backgroundImage: `url("/assets/hero-space.jpg")` }}>
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-7xl font-bold">The best way to start project tasks tracking</h1>
          <p className="mb-5 text-2xl">Honack is the best way to start project tasks tracking & calculate honest
            payrolls.</p>
          {!user && <Link to={"/guide"}>
            <button className="btn btn-primary">
              Get started
            </button>
          </Link>}

          {user && <Link to={"/projects"}>
            <button className="btn btn-primary">
              View your projects
            </button>
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default Hero;
