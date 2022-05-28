import { Fragment } from "react"; //useful if you don't want
//to render a specific part of html

import { Outlet, Link  } from "react-router-dom";

import { ReactComponent as CrwnLogo} from "../../assets/crown.svg"

import "./navigation.styles.scss";

const Navigation = () => {
    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo"/>
            </Link> 
            <div className="nav-links-container">
              <Link className="nav-link" to='/shop'>
                SHOP
              </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation