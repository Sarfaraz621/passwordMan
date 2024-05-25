import React from "react";

const Footer = () => {
  return (
    <div className=" flex flex-col justify-center items-center py-1 bg-slate-800 text-white w-full">
      <div className="logo font-bold">
        <span className="text-green-600">&lt;</span>
        Data<span className="text-green-600">Vault</span>
        <span className="text-green-600">/&gt;</span>
      </div>
      <div>&copy; by projects assosciations.</div>
    </div>
  );
};

export default Footer;
