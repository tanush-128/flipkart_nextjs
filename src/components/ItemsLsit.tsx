"use client";
import { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";
export const ItemsList = () => {
  return (
    <div className="bg-white p-2">
      <div className="py-2 text-xl font-semibold">Best Mobile</div>
      <Carousel>
        <CarouselContent className="mt-2 gap-4">
          {[1, 2, , 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i, index) => (
            <CarouselItem className="basis-1/8" key={index}>
              <Item />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

const Item = () => {
  return (
    <Link
      href="/itemsListView"
      className="flex max-w-40 flex-col items-center rounded-md border p-4 ring-slate-400"
    >
      <Image
        alt=""
        src="https://rukminim1.flixcart.com/image/210/210/xif0q/mobile/h/a/k/-original-imagqx45wnzbh25s.jpeg?q=80"
        width={210}
        height={210}
      />
      <div className="text-sm">Redmi Note 10 Pro Max</div>
      <div>₹19,999</div>
    </Link>
  );
};
