import { type Product } from "@prisma/client";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { useState } from "react";
export const ProductBriefView = ({ product }: { product: Product }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex max-w-5xl border-b p-4">
      <div className="relative min-w-max px-8">
        <Image
          src={product.images[0]!}
          alt={product.name}
          width={160}
          height={160}
        />
        <button title="like" name="like" className="absolute right-6 top-0" onClick={
          () => {
            setIsLiked((prev) => !prev);
          }
          
        }>
          <Heart stroke="" fill={isLiked ? "red" : "gray"} size={20} />
        </button>
        <div className="mt-4 flex items-center gap-2">
          <Checkbox />{" "}
          <span className="hover:font-semibold">Add to compare</span>
        </div>
      </div>
      <div className="min-w-max">
        <Link href="/productView" className="font-medium hover:text-blue-600">
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
        <div>
          <ul className="list-disc">
            {product.highlights.map((highlight, index) => (
              <li className="p-1 text-sm text-zinc-800" key={index}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full flex-col items-end">
        <div>
          <span className="text-2xl font-bold">₹{product.price}</span>
        </div>
        <div>
          <div>
            <span className="text-zinc-500 line-through">₹{product.mrp}</span>
            <span className="font-medium text-green-700"> 50% off</span>
          </div>
        </div>
      </div>
    </div>
  );
}
