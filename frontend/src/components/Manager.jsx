import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const Manager = () => {
  const ref = useRef(null);
  const passwordRef = useRef(null);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editingId, setEditingId] = useState(null);
  // const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
  //   useAuth0();

  const getPasswords = async () => {
    // const token = await getAccessTokenSilently(); // Add this line
    let req = await axios.get(`https://passwordman.onrender.com/api/data`);
    let passwords = await req.data;
    // console.log(passwords);
    setPasswordArray(passwords);
    console.log(passwords);
  };

  //  let res = fetch("abc.com",{method:"POST",body:JSON.stringify({...form,id:uuidv4()})})
  const localPasswords = () => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    } else {
      setPasswordArray([]); // Ensure passwordArray is initialized as an array
    }
  };
  useEffect(() => {
    getPasswords();
    // localPasswords();
  }, []);
  useEffect(() => {
    console.log("Updated password array: ", passwordArray);
  }, [passwordArray]);

  const iconStyle = {
    fontSize: "1rem",
    color: "black",
    marginLeft: "1.5rem",
    transition: "font-size 0.1s ease-out",
  };

  const handleMouseEnter = (e) => {
    e.target.style.fontSize = "1.3rem";
  };

  const handleMouseLeave = (e) => {
    e.target.style.fontSize = "1rem";
  };

  const showPassword = () => {
    passwordRef.current.type = "password";
    if (ref.current && ref.current.src.endsWith("icons/visibility.png")) {
      ref.current.src = "icons/invisible.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/visibility.png";
      passwordRef.current.type = "password";
    }
  };
  const savePassword = async () => {
    if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
      toast(`Please fill in all fields.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (editingId) {
      // Update existing password
      // const token = await getAccessTokenSilently();
      await axios.put(
        `${process.env.REACT_BACKEND_LINK}/api/data/${editingId}`,
        form
      );
      const updatedArray = passwordArray.map((item) =>
        item._id === editingId ? { ...item, ...form } : item
      );
      setPasswordArray(updatedArray);
      setEditingId(null);

      setForm({ site: "", username: "", password: "" });
    } else {
      try {
        // const token = await getAccessTokenSilently();
        await axios.post(`${process.env.REACT_BACKEND_LINK}/api/data`, {
          ...form,
        });
      } catch (err) {
        console.log(err);
      }
      const updatedArray = [
        ...passwordArray,
        {
          ...form,
        },
      ];
      setPasswordArray(updatedArray);
      console.log(updatedArray);
      setForm({ site: "", username: "", password: "" });
      // toast("Data Saved!", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };
  const deletePassword = async (id) => {
    try {
      console.log("Frontend id : ", id);
      // const token = await getAccessTokenSilently();
      await axios.delete(`${process.env.REACT_BACKEND_LINK}/api/data/${id}`);
      const updatedDeleteArray = passwordArray.filter((element) => {
        return element._id !== id;
      });
      setPasswordArray(updatedDeleteArray);

      console.log(passwordArray);
      // toast(`Password Deleted.`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  const editPassword = async (id) => {
    // toast(`Selected data is in input fields now.`, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    /////////////////
    console.log("Frontend edit id : ", id);
    const selectedPassword = passwordArray.find((item) => item._id === id);
    setForm(selectedPassword);
    setEditingId(id);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div
        className="fixed inset-0 -z-10 min-h-screen w-full bg-green-50 
  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),
  linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
  bg-[size:6rem_4rem]"
      >
        <div className="fixed top-0 z-[-2] min-h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="p-1 md:mycontainer min-h-[84.1vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-600">&lt;</span>
          <span>Data</span>
          <span className="text-green-600">Vault/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            onChange={handleChange}
            required
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                value={form.password}
                ref={passwordRef}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
              <span className="absolute top-0.5 right-1.5 cursor-pointer">
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/visibility.png"
                  alt="visible"
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          <div
            className="flex justify-center items-center bg-green-500 rounded-full px-5 py-2
           w-fit hover:bg-green-400 border-2 border-green-900 cursor-pointer"
            onClick={() => savePassword()}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            <button>Save Data</button>
          </div>
        </div>
        <h2 className="font-bold text-xl">Saved Passwords</h2>
        {passwordArray.length === 0 && <div>No passwords to show</div>}

        {passwordArray.length !== 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden my-8">
            <thead className=" bg-green-600 text-white ">
              <tr>
                <th className="py-1">Username</th>
                <th className="py-1">Site</th>
                <th className="py-1">Password</th>
                <th className="py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center w-6 py-2">
                      {item.site}
                      <i
                        className="fa fa-copy"
                        style={iconStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => copyText(item.site)}
                      ></i>
                    </td>
                    <td className="text-center w-6 py-2">
                      {item.username}
                      <i
                        className="fa fa-copy"
                        style={iconStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => copyText(item.username)}
                      ></i>
                    </td>
                    <td className="text-center w-6 py-2">
                      {item.password}
                      <i
                        className="fa fa-copy"
                        style={iconStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => copyText(item.password)}
                      ></i>
                    </td>
                    <td className="text-center w-6 py-2  mx-1">
                      <i
                        className="fa fa-edit"
                        style={iconStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => editPassword(item._id)}
                      ></i>
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={iconStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => deletePassword(item._id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
