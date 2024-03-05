"use client";
import { Product } from "@prisma/client";
import { Check, ChevronsUpDown, Minus, Plus, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { GetCartItems, RemoveItemFromCart } from "~/actions/actions";
import { MaxWidthWrapper } from "~/components/MaxWidthWrapper";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { useCartStore } from "~/store";

const CartPage = () => {
  const _products = [product, product, product, product, product];
  const { data } = useSession();
  const { products, setProducts } = useCartStore();
  const totalCost = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const totalMRP = products.reduce((acc, product) => {
    return acc + product.mrp * product.quantity;
  }, 0);
  useEffect(() => {
    if (!data?.user?.id) return;
    void GetCartItems(data?.user?.id).then((products) => {
      setProducts(products.map((p) => ({ ...p, quantity: 1 })));
    });
    // setProducts(_products.map((product) => ({ ...product, quantity: 1 })));
  }, [data]);

  return (
    <MaxWidthWrapper className="mt-7 flex flex-col items-center justify-center md:flex-row md:items-stretch">
      <div className="min-h-36 w-full  bg-white p-2 md:w-3/5">
        {products.length > 1 &&
          products.map((product, index) => (
            <CartItem
              userId={data?.user?.id}
              key={index}
              i={index}
              product={product}
            />
          ))}
        {products.length === 0 && (
          <div className=" flex h-full items-center justify-center">
            <span>No items in cart</span>
          </div>
        )}
      </div>
      <div className="sticky top-20 -z-50 w-80 bg-white p-4">
        <div className="border-b py-1 text-lg font-medium text-zinc-500">
          PRICE DETAILS
        </div>
        <div className="flex flex-col gap-4 border-b py-2 text-[18px]">
          <div className="flex justify-between">
            <div>Price (3 items)</div>
            <div>₹{totalCost}</div>
          </div>
          <div className="flex justify-between">
            <div>Delivery Charges</div>
            <div>₹30</div>
          </div>
          <div className="flex justify-between">
            <div>Discount</div>
            <div>₹{product.price + 30}</div>
          </div>
        </div>
        <div className="flex justify-between border-b py-2 text-xl font-semibold">
          <div>Total Amount</div>
          <div>₹{totalCost + 30}</div>
        </div>
        <div className="py-2 font-medium text-green-700">
          You will save ₹{totalMRP - totalCost} on this order
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

const CartItem = ({
  userId,
  i,
  product,
}: {
  userId?: string;
  i: number;
  product: Product;
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useCartStore();

  return (
    <div className=" border-b  md:gap-6">
      <div className="flex gap-2 p-1 md:gap-6 md:p-4">
        <div className="flex flex-col md:gap-6">
          <Image
            src={product.images[0]!}
            alt="product image"
            width={100}
            height={100}
            className="h-20 w-20 object-contain"
          />
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  decreaseProductQuantity(i);
                }
              }}
              className="rounded-full border p-1"
            >
              <Minus strokeWidth={0.8} />
            </button>
            <div className=" border px-4">{quantity}</div>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
                increaseProductQuantity(i);
              }}
              className="rounded-full border p-1"
            >
              <Plus strokeWidth={0.8} />
            </button>
          </div>
          <div>
            {/* dropdown     */}

            <ComboboxDemo i={i} />
          </div>
        </div>
        <div className="flex flex-col justify-between pb-2 md:flex-row md:gap-6">
          <div className="flex flex-col  justify-between md:p-1">
            <div className="flex flex-col gap-1">
              <div className="line-clamp-1 md:font-medium">{product.name}</div>
              <div className="hidden text-[14px] text-zinc-500 md:block">
                {"AMD Free Sync, Response Time: 5 ms, 75 Hz Refresh Rate"}
              </div>
              <div className="flex gap-2">
                <div className="flex w-fit items-center gap-1 rounded bg-green-700 px-1 text-white">
                  {product.rating}
                  <Star fill="white" size={12} />
                </div>
                <div className="font-medium text-zinc-500">
                  {product.reviewsCount} Reviews
                </div>
              </div>
              <div className="flex items-center gap-2 md:mt-4">
                <span className="text-sm text-zinc-500">
                  <s>₹{product.mrp}</s>
                </span>
                <span className="text-lg font-medium">₹{product.price}</span>
                <span className="font-medium  text-green-700">
                  {(
                    ((product.mrp - product.price) * 100) /
                    product.mrp
                  ).toPrecision(2)}
                  % off
                </span>
              </div>
            </div>
            <div className="hidden  gap-6 md:flex">
              <button className="font-medium md:text-lg">SAVE FOR LATER</button>
              <button
                className="font-medium md:text-lg"
                onClick={() => {
                  removeProduct(i);
                  void RemoveItemFromCart(userId!, product.id);
                }}
              >
                REMOVE
              </button>
            </div>
          </div>
          <div className="flex gap-2 text-sm md:block md:text-base">
            <div>Delivery by Tue Sep 28 |</div>
            <div className="flex gap-1">
              <span className="text-zinc-500">
                <s>₹120</s>
              </span>

              <span>₹30</span>
              <span className="text-green-700  ">75% off</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full  justify-evenly md:hidden">
        <button className="w-full border p-2 text-sm font-medium text-zinc-500 md:text-lg">
          SAVE FOR LATER
        </button>
        <button
          className="w-full border text-sm font-medium text-zinc-500 md:text-lg"
          onClick={() => {
            removeProduct(i);
            void RemoveItemFromCart(userId!, product.id);
          }}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartPage;

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

const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((quantity) => ({
  value: quantity.toString(),
  label: quantity.toString(),
}));

function ComboboxDemo({ i }: { i: number }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProduct,
    setProductQuantity,
  } = useCartStore();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[60px] justify-between"
        >
          {value
            ? quantities.find((quality) => quality.value === value)?.label
            : "1"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-40 w-[60px] overflow-y-auto p-0">
        <Command>
          <CommandEmpty>1</CommandEmpty>
          <CommandGroup>
            {quantities.map((quantity) => (
              <CommandItem
                key={quantity.value}
                value={quantity.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setProductQuantity(i, parseInt(value));

                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === quantity.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {quantity.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
