import React, { useEffect, useState, useContext, useRef } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/cart";
import UserContext from "../context/user";
import userService from "../services/user.service";
import { Link } from "react-router-dom";

function Header() {
  const { cart } = useContext(CartContext);
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [authHover, setAuthHover] = useState(false);

  function handleAuth() {
    if (!user) {
      navigate("/login");
    }
  }

  function logout() {
    userService
    .logout()
    .then(res => res.status)
    .then(status => {
      if (status == 200) {
        updateUser()
        navigate("/")
        window.location.reload()
      }
    })
    .catch(err => alert(err.message))
  }

  return (
    <header className="flex justify-between item-center bg-black text-white py-4 px-6 h-max">
      <p className="text-2xl font-bold cursor-pointer " onClick={() => navigate("/")}>Shopify</p>
      <div className="flex space-x-3 items-center">
      <Link to="/products">Products</Link>
        {user && (
          <div
            className="flex gap-2 cursor-pointer border-white border p-1 "
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon />
            <p className="bg-white px-2 text-black rounded   ">
              {cart && cart.length}
            </p>
          </div>
        )}

        <div  
          onMouseOver={() => setAuthHover(true)}
          onMouseOut={() => setAuthHover(false)}
          className="flex flex-col items-end w-auto"
        >
          <div className="cursor-pointer flex gap-2" onClick={handleAuth}>
            <PersonIcon />
            <p>{user && user.firstname}</p>
          </div>
          <div className="">
            {user && authHover && (
            <div
              className={`flex flex-col w-max absolute right-0`}
            >
              <div className="px-3 py-2 bg-black text-white hover:bg-neutral-800" onClick={() => navigate("/purchases")}>My purchases</div>
              <div className="px-3 py-2 bg-black text-white  hover:bg-neutral-800" onClick={logout}>Log out</div>
            </div>
          )}
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;
