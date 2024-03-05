import Image from "next/image";
import { MaxWidthWrapper } from "~/components/MaxWidthWrapper";

import { Product, Review } from "@prisma/client";
import { MapPin, Star } from "lucide-react";

import { GetProduct } from "~/actions/actions";
import AddToCart from "./AddToCart";
import Ratings from "./Ratings";

export default async function ProductView({
  params,
}: {
  params: { slug: string };
}) {
  const product: Product = await GetProduct(params.slug);
  // const product: Product = _product;
  return (
    <MaxWidthWrapper className="mt-2 flex flex-col  items-start justify-start bg-white p-4 lg:flex-row">
      <div className="top-20 mx-auto flex flex-col-reverse md:min-w-max md:flex-row lg:sticky">
        <div className="flex overflow-x-scroll md:h-[480px]  md:flex-col md:overflow-x-auto md:overflow-y-scroll">
          {product.images.map((image, index) => (
            <Image
              src={image}
              width={64}
              height={64}
              alt=""
              key={index}
              className="border p-1"
            />
          ))}
        </div>
        <div className="mx-auto">
          <div className="flex justify-center border px-12 py-2">
            <Image
              src={product.images[0]!}
              width={360}
              height={360}
              alt=""
              className="w-4/5 md:w-full"
            />
          </div>
          <AddToCart params={params} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-medium hover:text-blue-600">{product.name}</div>
        <div className="flex gap-4">
          <div className="flex w-fit items-center gap-1 rounded bg-green-700 px-1 text-white">
            {product.rating}
            <Star fill="white" size={12} />
          </div>
          <div className="font-medium text-zinc-500">
            {product.reviewsCount} Reviews
          </div>
        </div>
        <div className="flex items-baseline gap-2">
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
        <div className="my-4">
          <span className="font-semibold">Availible Offers</span>
          {offers.map((offer, index) => (
            <div key={index} className=" flex p-1">
              <Image
                alt="offer"
                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="text-sm">{offer}</span>
            </div>
          ))}
        </div>
        <div className="my-2 flex flex-col md:flex-row md:gap-16">
          <span className="text-sm font-medium text-zinc-500">Highlights</span>
          <ul className="list-disc marker:text-lg marker:text-zinc-500">
            {product.highlights.map((highlight, index) => (
              <li className=" text-sm text-zinc-800" key={index}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-2 flex flex-col md:flex-row md:gap-10">
          <span className="text-sm font-medium text-zinc-500">Description</span>
          <ul className="list-disc text-sm marker:text-lg marker:text-zinc-500">
            {product.description}
          </ul>
        </div>
        <div className="my-2 flex flex-col md:flex-row md:gap-10">
          <span className="text-sm font-medium text-zinc-500">Delivery</span>
          <div>
            <div className="flex border-b-2 border-blue-600 p-2">
              <MapPin size={24} fill="gray" stroke="white" />
              <input
                type="text"
                placeholder="Enter Delivery Pincode"
                className="outline-none"
              />
              <button className="font-medium text-blue-600">Check</button>
            </div>
            <div className="flex items-baseline justify-between">
              <span className=" font-medium">Delivery by 10 Jan</span>
              <span className="text-sm font-medium text-zinc-500">₹40</span>
            </div>
            <span className="text-sm">If ordered before 3:39</span>
          </div>
        </div>
        <Ratings params={params} />
      </div>
    </MaxWidthWrapper>
  );
}

const _product: Product = {
  name: "MOTOROLA g84 5G (Midnight Blue, 256 GB)  (12 GB RAM)",
  description:
    "Explore a new array of features on this Moto G84 5G smartphone that is available in multiple colours, including the shades of PANTONE, Viva Magenta, Midnight Blue, and Marshmallow Blue. You can get this phone in premium vegan leather finish and in a 3D premium PMMA acrylic glass finish. The 10-bit billion colours with pOLED Display offer you an immersive entertainment experience. The availability of 12 GB RAM delivers nimble performance while 256 GB ROM offers vast storage space. With 14 5G bands, you can experience superfast network connectivity. Click stunning photographs with the 50 MP OIS camera with Ultra-pixel technology, 16 MP front camera and fill your life with memories. Loaded with impressive features like stereo speakers with Dolby Atmos and Moto Spatial sounds, Moto Connect, ThinkShield security, Family Space, IP54 water-resistant, etc., this phone is definitely a game changer.",
  images: [
    "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/u/a/i/g84-5g-paym0016in-motorola-original-imagsy5u8nmttezf.jpeg?q=70",
  ],
  price: 100,
  rating: 4,
  reviewsCount: 100,
  highlights: [
    "12 GB RAM | 256 GB ROM",
    "16.64 cm (6.55 inch) Full HD+ Display",
    "50MP (OIS) + 8MP | 16MP Front Camera",
    "5000 mAh Battery",
    "Snapdragon 695 Processor",
  ],
  slug: "product-name",
  id: "1",
  mrp: 200,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    rating: 4,
    title: "Mind-blowing purchase",
    comment: "Camera quality is awesome ❤️✨ thnx Flipkart 😀❤️",
    createdAt: new Date(),
    deletedAt: null,
    userId: "1",
  },
];

const offers = [
  "Bank Offer10% off on Bank of Baroda Credit Card EMI Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10 % off on IDFC FIRST Bank Credit Card EMI Transactions, up to ₹1,250 on orders of ₹10,000 and above ",
  "Bank OfferFlat ₹750 off on OneCard Credit Card and Credit EMI Transactions on orders of ₹12,500 and above",
  "Special PriceGet extra₹3500 off (price inclusive of cashback/coupon)",
];
