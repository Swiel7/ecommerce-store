import productsJSON from "../data/products-complete.json";
import { categories as categoriesX } from "../data/categories";

import ImageKit from "imagekit";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { products, categories, users, reviews } from "./schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const projectFolder = "/techvvare-store";

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string,
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const seed = async () => {
  console.log("Seeding data...");

  try {
    console.log("Adding categories images");

    for (const category of categoriesX) {
      let image = null;

      if (category.image) {
        image = (await uploadToImageKit(
          category.image,
          `${category.title.toLowerCase()}.png`,
          `${projectFolder}/categories`,
        )) as string;
      }

      await db.insert(categories).values({
        name: category.title,
        image,
      });
    }

    for (const product of productsJSON) {
      const slug = `${product.brand} ${product.model}`
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-");

      const [category] = await db
        .select()
        .from(categories)
        .where(eq(categories.name, product.category.title));

      console.log("Adding products images");

      const images = (await Promise.all(
        product.images.map((image, index) =>
          uploadToImageKit(
            image,
            `${slug}-${index + 1}.png`,
            `${projectFolder}/products/${slug}`,
          ),
        ),
      )) as string[];

      console.log("Adding product data");

      const [newProduct] = await db
        .insert(products)
        .values({
          name: `${product.brand} ${product.model}`,
          slug,
          brand: product.brand,
          model: product.model,
          description: product.description,
          category: category.id,
          variants: product.colors.map(({ name, value }) => ({
            colorName: name,
            colorCode: value,
            stock: !product.inStock
              ? 0
              : Math.floor(Math.random() * (30 - 1 + 1) + 1),
          })),
          images,
          regularPrice: product.regularPrice,
          discountPrice: product.discountPrice,
          isFeatured: product.isFeatured,
          onSale: product.onSale,
          dimensions: product.dimensions,
          weight: product.weight,
          numReviews: product.reviews.length,
          rating:
            product.reviews.length > 0
              ? (
                  product.reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0,
                  ) / product.reviews.length
                ).toString()
              : "0",
        })
        .returning();

      for (const review of product.reviews) {
        const names = review.user[0].name.split(" ");
        let user;

        const userImages: { firstName: string; image: string }[] = [
          {
            firstName: "Ezekiel",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F1.jpg?alt=media&token=6dca0128-13b6-4cf6-8b23-d43c09805f23",
          },
          {
            firstName: "Jasper",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F2.jpg?alt=media&token=3e5ee247-686f-407b-8830-01294da42fdf",
          },
          {
            firstName: "Sarai",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F3.jpg?alt=media&token=fda7ff3d-30d6-4f7d-9c70-c7db1ffaed05",
          },
          {
            firstName: "Christop",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F4.jpg?alt=media&token=277f1843-eb97-4fa0-a48b-1fa688ae0e1e",
          },
          {
            firstName: "Harry",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F5.jpg?alt=media&token=b3fde5e6-d03c-4747-82dc-4aa721a9c72b",
          },
          {
            firstName: "Leonor",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F6.jpg?alt=media&token=08e38e54-1ec8-43bc-99ea-836b9e197c27",
          },
          {
            firstName: "Marshall",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F7.jpg?alt=media&token=ef9787dc-023d-4808-a330-ab52549af859",
          },
          {
            firstName: "Christa",
            image:
              "https://firebasestorage.googleapis.com/v0/b/techvvave-store.appspot.com/o/avatars%2F8.jpg?alt=media&token=23e43368-5e69-4707-b76e-a514e6790a3a",
          },
        ];

        console.log("Adding user data");

        const userExist = await db
          .select()
          .from(users)
          .where(eq(users.email, review.user[0].email));

        if (userExist.length > 0) {
          user = userExist[0];
        } else {
          const result = userImages.find(
            (image) => image.firstName === names[0],
          ) as {
            firstName: string;
            image: string;
          };

          const uploadedUserImage = await uploadToImageKit(
            result.image,
            `${names[0]}-${names[1]}-image.png`,
            `${projectFolder}/users`,
          );

          user = (
            await db
              .insert(users)
              .values({
                firstName: names[0],
                lastName: names[1],
                email: review.user[0].email,
                password: review.user[0].password,
                image: uploadedUserImage,
              })
              .returning()
          )[0];
        }

        console.log("Adding review");

        await db.insert(reviews).values({
          description: review.description,
          rating: review.rating,
          productId: newProduct.id,
          userId: user.id,
          createdAt: new Date(review.date),
        });
      }
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteData = async () => {
  const tables = [reviews, products, users, categories];

  try {
    console.log("Deleting images");
    await imagekit.deleteFolder(projectFolder);

    console.log("Deleting tables");
    for (const table of tables) {
      await db.delete(table);
    }

    console.log("Data successfully deleted!");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

seed();
// deleteData();
