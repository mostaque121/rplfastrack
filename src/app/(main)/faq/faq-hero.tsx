import { PageHero } from "@/components/sections/page-hero";

export default function FaqHero() {
  return (
    <PageHero
      title="RPL frequently asked questions"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      intro={
        <p>
          Straight answers about Recognition of Prior Learning (RPL): who is eligible, what evidence
          you need, how long it takes and who issues your qualification.
        </p>
      }
    />
  );
}
