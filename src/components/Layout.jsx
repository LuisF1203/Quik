import { IoSaveOutline } from "react-icons/io5";
import { MdSaveAlt, MdOutlineDraw } from "react-icons/md";
import { FaPrint, FaShare, FaRegFileVideo, FaAlignRight } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { ImFilePicture, ImEmbed2 } from "react-icons/im";

function Layout({ children }) {
  return (
    <>
      <nav className="bg-[#000000dd] text-white fixed top-0 left-0 right-0 flex justify-between p-5 z-50 ">
        <ul className="flex gap-5">
          <li>
            <span>Quik</span>
          </li>

          <li className="relative group">
            <span className="cursor-pointer">File</span>
            <ul className="absolute bg-black pt-4 pb-4 w-[10vw] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <IoSaveOutline className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Save</span>
                </span>
              </li>
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <MdSaveAlt className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Save as</span>
                </span>
              </li>
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <FaPrint className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Print</span>
                </span>
              </li>
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <FaShare className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Share</span>
                </span>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Insert</span>
            <ul className="absolute bg-black pt-4 pb-4 w-[10vw] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <CiViewTable className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Table</span>
                </span>
              </li>
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <ImFilePicture className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Pictures</span>
                </span>
              </li>
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <FaRegFileVideo className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Video</span>
                </span>
              </li>
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <ImEmbed2 className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">Embeded</span>
                </span>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Draw</span>
            <ul className="absolute bg-black pt-4 pb-4 w-[10vw] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
              <span className="flex gap-2">
                  <MdOutlineDraw  className="mt-auto mb-auto" />
                  <span className="mt-auto mb-auto">New canvas</span>
                </span>
              </li>

            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Layout</span>
            <ul className="absolute bg-black pt-4 pb-4 w-[10vw] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
              <li className="hover:bg-white transition hover:scale-105 hover:text-black pl-5 cursor-pointer">
                <span className="flex gap-2">
                  <FaAlignRight   className="mt-auto mb-auto" />
                  <div className="mt-auto mb-auto flex gap-2 pr-2 ">
                    <span>Ident</span>
                    <input type="number" className="w-full text-black text-center rounded outline-none"/>
                  </div>
                </span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/register">login / register</a>
          </li>
        </ul>
      </nav>
      <main className="pt-12 bg-[#1f1f1f]">{children}</main>
    </>
  );
}

export default Layout;
