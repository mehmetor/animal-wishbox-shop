import { Metadata } from "next";

import FeaturedProducts from "@modules/home/components/featured-products";
import Hero from "@modules/home/components/hero";
import { listCollections } from "@lib/data/collections";
import { getRegion } from "@lib/data/regions";

export const metadata: Metadata = {
  title: "Animal Wishbox",
  description:
    "Animal Wishbox is a platform for animal lovers to find and buy products for their animals.",
};

export default async function Home(props: {
  params: Promise<{ countryCode: string }>;
}) {
  
  const params = await props.params;

  const { countryCode } = params;

  const region = await getRegion(countryCode);

  const { collections } = await listCollections({
    fields: "id, handle, title",
  });

  if (!collections || !region) {
    return null;
  }

  return (
    <>
      <Hero />
      <ul className="flex flex-col gap-x-6 px-12">
        <li>
          <h1>Hello</h1>
        </li>
      </ul>
      <ul className="flex flex-col gap-x-6 px-12">
        <FeaturedProducts collections={collections} region={region} />
      </ul>
    </>
  );
}
