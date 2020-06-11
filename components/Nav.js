import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const [show, setDisplay] = useState(false);

  return (
    <nav className="site-nav">
      <div className="container">
        <div className="site-logo">
          <Link href="/">
            <a className="">UIGarage</a>
          </Link>
        </div>

        <div className={`site-menu ${show ? "show" : ""}`} id="">
          <ul>
            <li className="site-menu_item">
              <Link href="/categories">
                <a className="nav-link">Categories</a>
              </Link>
            </li>
            <li className="site-menu_item">
              <a className="nav-link" href="#">
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
