"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export const OffersBanner = () => {
  return (
    <Carousel className=" mt-8">
      <CarouselContent>
        <CarouselItem>
          <Image
            alt="1"
            src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/b6d0f4b7a5e55fbc.jpg?q=20"
            width={1600}
            height={270}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            alt="2"
            src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/cdcfbef98097e15a.jpg?q=20"
            width={1600}
            height={270}
          />
        </CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
