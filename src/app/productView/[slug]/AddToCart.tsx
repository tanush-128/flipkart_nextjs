"use client";

import { Product } from "@prisma/client";
import { ShoppingCart, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AddItemToCart, GetProduct } from "~/actions/actions";
import { createCheckoutSession } from "~/actions/stripe";

export default function AddToCart({ params }: { params: { slug: string } }) {
  const { data } = useSession();
  const [product, setProduct] = useState<Product>(_product);
  const [itemInCart, setItemInCart] = useState<boolean>(false);
  const slug = params.slug;
  useEffect(() => {
    void GetProduct(slug).then((product) => setProduct(product));

    console.log(data?.user, product.id);
    if (data?.user.cartProductIds.includes(product.id) && product.id !== "1") {
      setItemInCart(true);
    }
  }, [slug, data]);
  return (
    <div className="flex justify-between p-2">
      <button
        className=" m-1 flex w-full justify-center gap-2 bg-yellow-500  py-4 font-bold text-white md:p-4"
        onClick={() => {
          if (itemInCart) return;
          if (data) void AddItemToCart(data?.user.id, product.id);
          setItemInCart(true);
        }}
      >
        <ShoppingCart fill="white" />
        {itemInCart ? "ITEM ADDED TO CART" : "ADD ITEM"}{" "}
      </button>
      <button
        className="m-1 flex w-full items-center justify-center gap-2 bg-orange-500 font-bold text-white md:p-4"
        onClick={() => {
          const data = new FormData();
          data.append("price", product.price.toString());
          data.append("name", product.name);
          data.append("description", product.description!);
          data.append("slug", product.slug);
          data.append("image", product.images[0]!);
          void createCheckoutSession(data);
        }}
      >
        <Zap fill="white" /> BUY NOW
      </button>
    </div>
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
