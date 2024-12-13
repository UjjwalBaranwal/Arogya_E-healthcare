import logo from "../../assets/logo.jpg";

function Logo() {
  return (
    <div className="text-center">
      <img src={logo} alt="Logo" className="h-24 w-auto" />
    </div>
  );
}

export default Logo;
