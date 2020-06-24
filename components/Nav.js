import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const [show, setDisplay] = useState(false);

  return (
    <nav className="bg-ui-dark p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="block w-auto">
          <Link href="/">
            <a className=""><img src="/img/UIGarage-Logo.svg" alt="UIGarage" width="145" height="32" /></a>
          </Link>
        </div>

        <div className={`w-auto ${show ? "show" : ""}`} id="">
          <ul className="flex items-center justify-end text-right">
            <li className="">
              <Link href="/categories">
                <a className="text-base text-grey-500 hover:text-white">Categories</a>
              </Link>
            </li>
            <li className="ml-5">
              <a className="text-base text-grey-500 hover:text-white" href="#">
                My Account
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
