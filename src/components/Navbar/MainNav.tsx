import { cn } from "@/lib/utils";
import { Link } from "@chakra-ui/react";
import { Home, Search } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BsFillSearchHeartFill } from "react-icons/bs";

export const MainNav = ({
  className}: React.HTMLAttributes<HTMLElement>) => {

  const location = useLocation();
  useEffect(() => {}, [location]);

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: location.pathname === `/`,
      Icon: Home,
      activeIcon: GoHomeFill,
    },
    {
      href: `/search`,
      label: "Search",
      active: location.pathname === `/search`,
      Icon: Search,
      activeIcon: BsFillSearchHeartFill,
    },
  ];

  return (
    <nav
      className={cn(
        " space-y-4  transition-all font-[600] hover:text-white",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-[15px] mx-auto items-center justify-center sm:justify-center md:justify-start xl:justify-start 2xl:justify-start  transition-colors text-[#a7a7a7] hover:text-primary flex",
            route.active ? "text-white dark:text-white" : "text-[#a7a7a7]"
          )}
        >
          {route.active ? (
            <route.activeIcon
              className={`w-6 h-6 mr-5 text-white dark:text-white`}
            />
          ) : (
            <route.Icon className={`w-6 h-6 mr-5 text-[#a7a7a7]`} />
          )}

          <span className="hidden sm:block md:block 2xl:flex xl:flex">
            {route.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
