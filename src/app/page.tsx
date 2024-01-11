
import Link from "next/link";
import { ItemsList } from "~/components/ItemsLsit";
import { MaxWidthWrapper } from "~/components/MaxWidthWrapper";
import { OffersBanner } from "~/components/OffersBanner";

export default function HomePage() {
  return (
    <MaxWidthWrapper className="flex flex-col">
      <OffersBanner />
      <ItemsList />
      <ItemsList />
    </MaxWidthWrapper>
  );
}

