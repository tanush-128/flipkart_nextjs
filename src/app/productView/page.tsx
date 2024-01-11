"use client";
import Image from "next/image";
import { MaxWidthWrapper } from "~/components/MaxWidthWrapper";

import { Product, Review } from "@prisma/client";
import { MapPin, ShoppingCart, Star, X, Zap } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function HomePage() {
  const [addReviewPopup, setAddReviewPopup] = useState(false);
  return (
    <MaxWidthWrapper className="mt-2 flex items-start justify-start bg-white p-4">
      {
       addReviewPopup && (  <AddReview setAddReviewPopup={setAddReviewPopup} />)

      }
      <div className="sticky top-20 flex min-w-max">
        <div className="flex h-[480px] flex-col overflow-y-scroll">
          <Image src={product.images[0]!} width={64} height={64} alt="" />
          <Image src={product.images[0]!} width={64} height={64} alt="" />
          <Image src={product.images[0]!} width={64} height={64} alt="" />
          <Image src={product.images[0]!} width={64} height={64} alt="" />
          <Image src={product.images[0]!} width={64} height={64} alt="" />
          <Image src={product.images[0]!} width={64} height={64} alt="" />
          <Image src={product.images[0]!} width={64} height={64} alt="" />
          <Image src={product.images[0]!} width={64} height={64} alt="" />
        </div>
        <div>
          <div className="border px-12 py-2">
            <Image src={product.images[0]!} width={360} height={360} alt="" />
          </div>
          <div className="flex justify-between">
            <button className=" m-1 flex w-full justify-center gap-2 bg-yellow-500 p-4 font-bold text-white">
              <ShoppingCart fill="white" /> GO TO CART{" "}
            </button>
            <button className="m-1 flex w-full justify-center gap-2 bg-orange-500 p-4 font-bold text-white">
              <Zap fill="white" /> BUY NOW
            </button>
          </div>
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
            <div key={index} className="flex p-1">
              <Image
                alt="offer"
                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                width={20}
                height={20}
              />
              <span className="text-sm">{offer}</span>
            </div>
          ))}
        </div>
        <div className="my-2 flex gap-16">
          <span className="text-sm font-medium text-zinc-500">Highlights</span>
          <ul className="list-disc marker:text-lg marker:text-zinc-500">
            {product.highlights.map((highlight, index) => (
              <li className=" text-sm text-zinc-800" key={index}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-2 flex gap-10">
          <span className="text-sm font-medium text-zinc-500">Description</span>
          <ul className="list-disc text-sm marker:text-lg marker:text-zinc-500">
            {product.description}
          </ul>
        </div>
        <div className="my-2 flex gap-10">
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

        <div className="border">
          <div className="mt-4 flex justify-between px-4">
            <span className="text-lg font-medium">Ratings & Reviews</span>
            <button className="rounded bg-white px-4 py-2 shadow-md" onClick={()=>setAddReviewPopup(true)}>
              Rate Product
            </button>
          </div>
          <div className="flex px-4">
            <div className="flex flex-col items-center">
              <span className="flex items-baseline gap-1 px-1 text-2xl font-medium">
                {product.rating} <Star size={16} fill="black" />{" "}
              </span>
              <span className="text-zinc-500">
                {product.reviewsCount} Ratings & <br /> {product.reviewsCount}{" "}
                Reviews
              </span>
            </div>
            <div></div>
            <div></div>
          </div>
          <div>
            {reviews.map((review, index) => (
              <div key={index} className="border p-4">
                <div className="flex gap-4">
                  <div className="flex w-fit items-center gap-1 rounded bg-green-700 px-1 text-white">
                    {review.rating}
                    <Star fill="white" size={12} />
                  </div>
                  <div>
                    <span className="font-medium">{review.title}</span>
                    <span className="text-sm text-zinc-500">
                      {" "}
                      {review.createdAt.toISOString().split("T")[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <span>{review.comment}</span>
                </div>
                <div className="text-sm text-zinc-500">
                  <span>created By {"Tanush"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

const product: Product = {
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

const AddReview = ({
  setAddReviewPopup,
}: {
  setAddReviewPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  const [rating, setRating] = useState<number>(4);
  return (
    <div className="fixed  bottom-5 right-5  z-50 w-min rounded-md bg-white  p-6 shadow-2xl">
      <div>
        <button
          className="absolute -right-2 -top-2 rounded-full border bg-red-600 p-1"
          onClick={() => {
            setAddReviewPopup(false);
          }}
        >
          <X stroke="white" strokeWidth={3} size={16} />
        </button>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-medium">Add Review</span>
        <button className="rounded bg-white px-4 py-2 shadow-md">
          Rate Product
        </button>
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-4">
          <span className="font-medium text-zinc-700">Rating : </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((number) => (
              <button
                key={number}
                onClick={() => setRating(number)}
                className="text-2xl"
              >
                <Star
                  fill={number <= rating ? "green" : "white"}
                  stroke="black"
                  strokeWidth={0.5}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <span className="min-w-max font-medium text-zinc-700">Title : </span>
          <input
            type="text"
            className="border-b outline-none"
            placeholder="Enter Title"
          />
        </div>
        <div className="flex gap-4">
          <span className="min-w-max font-medium text-zinc-700">Review : </span>
          <textarea
            className="border-b outline-none"
            placeholder="Enter Review"
          />
        </div>
      </div>
    </div>
  );
};
