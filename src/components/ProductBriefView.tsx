import { type Product } from "@prisma/client";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { useState } from "react";
export const ProductBriefView = ({ product }: { product: Product }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="relative flex max-w-7xl border-b p-4 ">
      <div className=" min-w-max px-2 md:relative md:px-8">
        <Image
          src={product.images[0]!}
          alt={product.name}
          width={160}
          height={160}
          objectFit="contain"
          className="max-w-20 sm:max-w-28  lg:max-w-none "
        />
        <button
          title="like"
          name="like"
          className="absolute right-4 top-2 md:right-6 md:top-0"
          onClick={() => {
            setIsLiked((prev) => !prev);
          }}
        >
          <Heart stroke="" fill={isLiked ? "red" : "gray"} size={20} />
        </button>
        <div className="mt-4 hidden items-center gap-2 sm:flex">
          <Checkbox />{" "}
          <span className=" hover:font-semibold sm:block">Add to compare</span>
        </div>
      </div>
      <div className="flex flex-col  md:w-full md:flex-row md:justify-between">
        <div className="md:min-w-max">
          <Link
            href={"/productView/" + product.slug}
            className=" line-clamp-2 hover:text-blue-600 md:font-medium"
          >
            {product.name}
          </Link>
          <div className="flex gap-4">
            <div className="flex w-fit items-center gap-1 rounded bg-green-700 px-1 text-white">
              {product.rating}
              <Star fill="white" size={12} />
            </div>
            <div className="font-medium text-zinc-500">
              {product.reviewsCount} Reviews
            </div>
          </div>
          <div className="hidden md:block">
            <ul className="list-disc">
              {product.highlights.map((highlight, index) => (
                <li className="p-1 text-sm text-zinc-800" key={index}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row-reverse items-center px-4  justify-end  gap-2  md:flex-col md:justify-start">
          <div>
            <span className=" font-bold md:text-2xl">₹{product.price}</span>
          </div>
          <div>
            <div className="flex flex-row-reverse gap-2">
              <span className="text-zinc-500 line-through">₹{product.mrp}</span>
              <span className="font-medium text-green-700"> 50% off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
