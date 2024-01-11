"use client";
import { Product } from "@prisma/client";
import { ProductBriefView } from "~/components/ProductBriefView";
import { CustomerRatingsFilter } from "~/components/filter/customerRatings";
import { PriceFilter } from "~/components/filter/price";

const Page = () => {
  const Products = [product, product, product, product, product, product]
  return (
    <div className="flex gap-10 px-16 py-2">
      <div className="w-60 bg-white">
        <div className="flex justify-between p-2">
          <span className="font-medium">FILTERS</span>
          <span className="font-medium text-blue-600 hover:underline">
            Clear all
          </span>
        </div>
        <PriceFilter />
        <CustomerRatingsFilter />
      </div>
      <div className="w-full bg-white">
        {Products.map((product, index) => (
          <ProductBriefView product={product} key={index} />
        ))
      }
      </div>
    </div>
  );
};

export default Page;

const product: Product = {
  name: "MOTOROLA g84 5G (Midnight Blue, 256 GB)  (12 GB RAM)",
  description: "Product Description",
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
