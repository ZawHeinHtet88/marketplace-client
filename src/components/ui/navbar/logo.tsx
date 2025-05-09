import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="">
      <Link to="/" className="font-mono text-2xl uppercase">
        <span className="text-primary font-extrabold">Ayeyar</span><span className="">Mart</span>
      </Link>
    </div>
  );
}

export default Logo;
