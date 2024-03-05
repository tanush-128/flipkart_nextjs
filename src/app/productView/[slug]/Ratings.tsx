"use client";
import { Product, Review } from "@prisma/client";
import { Star, X } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  AddProductReview,
  GetProduct,
  GetProductReviews,
} from "~/actions/actions";
interface ReviewWithUserEmail extends Review {
  user: {
    email: string;
  };
}
export default function Ratings({ params }: { params: { slug: string } }) {
  const { data } = useSession();

  const [product, setProduct] = useState<Product>(_product);

  useEffect(() => {
    void GetProduct(params.slug).then((product) => setProduct(product));

    void GetProductReviews(params.slug).then((reviews) => {
      console.log(reviews);
      // setReviews(reviews as ReviewWithUserEmail[]);
      setReviews(reviews as ReviewWithUserEmail[]);
    });

    console.log(data?.user);
  }, [data]);
  const [addReviewPopup, setAddReviewPopup] = useState(false);
  const [reviews, setReviews] = useState<ReviewWithUserEmail[]>([]);
  return (
    <div className="border">
      {addReviewPopup && (
        <AddReview
          setAddReviewPopup={setAddReviewPopup}
          productSlug={product.slug}
          data={data}
        />
      )}
      <div className="mt-4 flex justify-between px-4">
        <span className="text-lg font-medium">Ratings & Reviews</span>
        <button
          className="rounded bg-white px-4 py-2 shadow-md"
          onClick={() => setAddReviewPopup(true)}
        >
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
              <span>created By {review.user.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const AddReview = ({
  setAddReviewPopup,
  productSlug,
  data,
}: {
  setAddReviewPopup: Dispatch<SetStateAction<boolean>>;
  productSlug: string;
  data: Session | null;
}) => {
  const [rating, setRating] = useState<number>(4);
  const reviewRef = useRef<HTMLTextAreaElement>(null);

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
        <button
          className="rounded bg-white px-4 py-2 shadow-md"
          onClick={() => {
            if (data == null) {
              alert("Please Login to add review");
            } else if (reviewRef?.current?.value) {
              console.log(reviewRef.current.value);
              console.log(productSlug);
              console.log(data?.user?.id);
              void AddProductReview(
                productSlug,
                reviewRef.current.value,
                rating,
                data.user.id,
              );
            }
          }}
        >
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
            ref={reviewRef}
          />
        </div>
      </div>
    </div>
  );
};

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
