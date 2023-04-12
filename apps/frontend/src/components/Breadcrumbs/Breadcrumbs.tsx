import { Link } from "react-router-dom";
import React from "react";


interface BreadcrumbItem {
  name: string;
  path: string;
}
interface BreadcrumbsProps {
  links: BreadcrumbItem[];
}

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <div className="text-xl breadcrumbs no-underline text-">
      <ul>
        {links.map((link, index) => {
          return (
            <li key={index} className={"p-3 hover:bg-base-200 rounded-lg font-extralight"}>
              <Link to={link.path} style={
                {
                  textDecoration: "none",
                }
              }>{link.name}</Link>
            </li>
          );
        })
        }
      </ul>
    </div>
  );
};
export default Breadcrumbs;
