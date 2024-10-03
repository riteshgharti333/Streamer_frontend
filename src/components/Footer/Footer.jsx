import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { genre } from "../../assets/data";

const Foooter = () => {
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
        <h1>Genre</h1>
        <div className="genreInfo">
          {genre.map((g) => (
            <Link to={`/query?type=movies&genre=${g}`} key={g}>
              <span>{g}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="footerRight">
        <h1>Contact Me</h1>
        <div className="links">
          <div className="contactLinks">
            <a href="mailto:riteshgharti333@gmail.com">
              <span>riteshgharti333@gmail.com</span>
            </a>

            <span>+91 000 333 999</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foooter;
