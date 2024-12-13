import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className=" p-[3.2rem_2.4rem] border-r-2 border-grey-100 bg-white row-span-full flex flex-col gap-8 shadow-md shadow-gray-500">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
