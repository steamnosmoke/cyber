import Search from "./components/Search";
import Navigation from "./components/Navigation";
import PageButtons from "./components/PageButtons";

import Logo from "./images/components/Logo";

export default function Header() {
  return (
    <>
      <header className="main-header h-22 w-full py-4 bg-white fixed top-0 left-0 right-0 z-100 border-b border-gray-200 shadow-md">
        <div className="container">
          <div className="header-inner flex items-center justify-between">
            <Logo />
            <Search />
            <Navigation />
            <PageButtons />
          </div>
        </div>
      </header>
      <div className="header-background relative h-22"></div>
    </>
  );
}
