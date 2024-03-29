"use server";
import { type Product, type User } from "@prisma/client";
import { db } from "~/server/db";



export const CreateUser = (user: User) => {
  return db.user.create({
    data: user,
  });
};
export const CreateProduct = async (data: FormData) => {
  const slug = data.get("product_name")?.toString().replace(/\s/g, "-");

  const product: Product = {
    name: data.get("product_name") as string,
    mrp: Number(data.get("mrp")),
    price: Number(data.get("selling_price")),
    description: data.get("description") as string,
    highlights: data.getAll("highlights")  as unknown as string[],
    images: await UploadImages(data.getAll("images") as unknown as File[]),
    slug: slug!,
    rating: 0,
    reviewsCount: 0,
    id: "id" + Math.random().toString(16).slice(2),
    updatedAt: new Date(),
    createdAt: new Date(),
    deletedAt: null,
  };

  console.log(product);

  return db.product.create({
    data: product,
  });
};

const myHeaders = new Headers();
myHeaders.append("Authorization", "Basic e3thcGlfa2V5fX06e3thcGlfc2VjcmV0fX0=");

export const UploadImages = async (images: File[]) => {

  const ImageUrls = [] as string[];

  for (const image of images) {
    await Upload(image);
  }

async function Upload(image: File) {
    const formdata = new FormData();
    formdata.append("file", image, "[PROXY]");
    formdata.append("upload_preset", "wk8rrmkj");
    formdata.append("api_key", "963212776811178");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    await fetch(
      "https://api.cloudinary.com/v1_1/dsvo76qzw/image/upload",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        ImageUrls.push(JSON.parse(result).secure_url);
      })
      .catch((error) => console.log("error", error));
  }

  return ImageUrls;
};


export const GetProducts = async () => {
  return db.product.findMany();

};

export const GetProduct = async (slug: string) => {
  const product = await db.product.findUnique({
    where: {
      slug,
    },
    
  });
  if (product === null) throw new Error("Product not found");

    return product;
};

export const GetProductReviews = async (slug: string) => {
  return db.review.findMany({
    where: {
      product: {
        slug,
      
      },
      
    },
    include: {
      user: {
        select: {
        email: true,
       
        },
      
      }
    }
  },
  );
}
export const AddProductReview = async (slug: string, review: string, rating: number,userId: string) => {
  return db.review.create({
    data: {
      rating,
      title: "title",
      comment: review,
      user: {
        connect: {
          id: userId,
        },
      },
      product: {
        connect: {
          slug,
        },
      },
    },
  });
};
export const AddItemToCart = async (userId: string, productId: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      cartProductIds: {
        push: productId,
      
      },
    },
  });
}

export const RemoveItemFromCart = async (userId: string, productId: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      cartProductIds: {
        set: [...(await db.user.findUnique({ where: { id: userId } }))!.cartProductIds.filter((id) => id !== productId)]
      },
    },
  });
}

export const GetCartItems = async (userId: string) => {
 
  return db.product.findMany({
    where: {
      id: {
        in: (await db.user.findUnique({ where: { id: userId } }))!.cartProductIds,
      },
    },
  });
}

