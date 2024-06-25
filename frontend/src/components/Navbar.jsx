import AuthLogin from "./AuthLogin";
import AuthLogout from "./AuthLogout";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold">
          <span className="text-green-600">&lt;</span>
          Data<span className="text-green-600">Vault</span>
          <span className="text-green-600">/&gt;</span>
        </div>

        <button className="text-white bg-green-600 flex justify-center items-center rounded-full w-26 border border-white">
          <img className="w-7 m-1" src="icons/github.png" alt="github" />
          <span className="m-1">Github</span>
        </button>
      </div>
      {/* <AuthLogin />
      <AuthLogout /> */}
    </nav>
  );
};

export default Navbar;
