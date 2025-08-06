import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className=" mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className=" flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-9 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              {/* <div className="flex items-center gap-2"> */}
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
              {/* </div> */}
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:line">logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
