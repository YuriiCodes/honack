import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthStore } from "../../stores/AuthStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useLogout();
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">

        <Link to="/" className="btn btn-ghost normal-case text-xl">Honack</Link>
      </div>
      <div className="navbar-end">
        {user ? (<ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <NavLink to={"#"} className={"text-lg"}>
              Profile
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                   viewBox="0 0 24 24">
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </NavLink>
            <ul className="p-2">
              <li>
                <button onClick={() => {
                  handleLogout();
                }}>Log out
                </button>
              </li>
              <li>
                <Link to={"/projects"}>My projects
                </Link>
              </li>
            </ul>
          </li>
        </ul>) : (
          <div>
            <NavLink to="/login" className="btn">Login</NavLink>
            <NavLink to="/register" className="btn ml-3">Sign up</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
