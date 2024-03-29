"use client";
import {
  Gift,
  Heart,
  Menu,
  PackageCheck,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Store,
  User2Icon,
  UserCircle2,
  UserCircle2Icon,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const NavBar = () => {
  const { status } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div className="sticky top-0 z-20 rounded-b-2xl bg-white px-2 py-3 md:rounded-none">
      <div className=" mx-auto flex max-w-7xl items-center justify-evenly gap-2 md:gap-8">
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu strokeWidth={1} size={24} />
        </div>
        <Link href="/" className="hidden text-xl font-semibold md:block ">
          Flipkart
        </Link>
        <Input
          type="text"
          placeholder="Search for products, brands and more"
          className="h-10 bg-blue-100/70"
        />

        <NavigationMenu>
          <NavigationMenuList className="none hidden items-center gap-6 md:flex">
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/login" className="flex items-center gap-2">
                  <UserCircle2Icon strokeWidth={1} size={24} />
                  {status === "authenticated" ? "User" : "Login"}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className=" w-60">
                  <div className="flex justify-between border-b p-2">
                    <div>New Customer?</div>
                    <div className="font-semibold text-blue-600">Sign Up</div>
                  </div>
                  <ul className="text-sm">
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300/30">
                      <UserCircle2 strokeWidth={1} /> My Profile
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300/30">
                      <Plus strokeWidth={1} /> Flipkart Plus Zone
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300/30">
                      <PackageCheck strokeWidth={1} /> Orders
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300/30">
                      <Heart strokeWidth={1} /> Wishlist
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300/30">
                      <Gift strokeWidth={1} /> Rewards
                    </li>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/cart" className="flex items-center gap-2">
                <ShoppingCart strokeWidth={1} size={24} /> Cart
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/addProduct"
                className=" flex min-w-max items-center gap-2"
              >
                <Store strokeWidth={1} size={24} />
                <span>Become a seller</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="rounded-md ring-slate-500 hover:ring-1">
                <Menu strokeWidth={1} size={24} />
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {menuOpen && (
        <div className="absolute top-16 w-full px-4 md:hidden">
          <div className="flex w-full flex-col items-center justify-evenly rounded-b-lg bg-white p-2  shadow-xl md:hidden">
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 border-b p-2"
            >
              <UserCircle2Icon strokeWidth={1} size={24} />
              {status === "authenticated" ? "User" : "Login"}
            </Link>

            <Link
              href="/cart"
              className="flex w-full items-center justify-center gap-2 border-b p-2"
            >
              <ShoppingCart strokeWidth={1} size={24} /> Cart
            </Link>
            <Link
              href="/addProduct"
              className=" flex w-full min-w-max items-center justify-center gap-2 border-b p-2"
            >
              <Store strokeWidth={1} size={24} />
              <span>Become a seller</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
