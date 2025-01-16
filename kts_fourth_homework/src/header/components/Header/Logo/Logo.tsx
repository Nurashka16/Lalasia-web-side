import style from "./Logo.module.css";
import { Link } from "react-router-dom";
import LogoIcon from "./svg/LogoIcon";
import NameIcon from "./svg/NameIcon";
import { HOME } from "src/utils/const";

const Logo = () => {
  return (
    <>
      <span className="sr-only">link to home page</span>
      <Link to={HOME} className={style.logo}>
      <div className={style.logo_img}>
        <LogoIcon />
      </div>
      <div className={style.logo_text}>
        <NameIcon />
      </div>
    </Link>
    </>
  );
};

export default Logo;
