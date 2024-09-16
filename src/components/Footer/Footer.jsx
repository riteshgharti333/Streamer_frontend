import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.scss";
import { IoMdMail } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { genre } from "../../assets/data";

const Foooter = () => {
  const navigate = useNavigate();
  
  const handleLinkClick = () => {
    navigate(`/query?type=movies&genre=${g}`);
  };


  return (
    <div className="footer bg-primary">
      <div className="footerLeft">
        <div className="logo">
          <h1>Streamer</h1>
        </div>
        <div className="socilMediaIcon">
          <a href="https://github.com/riteshgharti333">
            <FaGithub className="leftIcon" />
          </a>
          <a href="https://www.linkedin.com/in/riteshgharti333">
            <FaLinkedin className="Linkedin" />
          </a>
        </div>
      </div>
      <div className="footerCenter">
        <p>Genre : </p>
        {genre.map((g) => (
          <span key={g}>
            <Link
              to={`/query?type=movies&genre=${g}`}
              onClick={handleLinkClick}
            >
              {g}
            </Link>
          </span>
        ))}
      </div>
      <div className="footerRight">
        <h1>Contact Me</h1>
        <div className="links">
          {/* <Link to={"/about"}>
            <span>About Me</span>
          </Link>
          <Link to={"/contact"}>
            <span>Contact Me</span>
          </Link> */}
          <div className="contactLinks">
            <a href="mailto:riteshgharti333@gmail.com">
              <span>
                <IoMdMail className="contactIcon" /> riteshgharti333@gmail.com
              </span>
            </a>

            <span>
              <IoCallSharp className="contactIcon" />
              +91 000 333 999
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foooter;
