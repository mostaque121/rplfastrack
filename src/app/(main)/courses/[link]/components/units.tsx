import { RichText } from "@/components/rich-text/rich-text";

import { UnitGroup } from "./unit-group";

const hasText = (html?: string | null) => !!html?.replace(/<[^>]*>/g, "").trim();

/** Core and elective units, each in a collapsible panel. */
export default function Units({
  coreUnits,
  electiveUnits,
}: {
  coreUnits: string;
  electiveUnits: string;
}) {
  return (
    <div className="space-y-3">
      {hasText(coreUnits) && (
        <UnitGroup title="Core units">
          <RichText className="text-sm" html={coreUnits} />
        </UnitGroup>
      )}
      {hasText(electiveUnits) && (
        <UnitGroup title="Elective units">
          <RichText className="text-sm" html={electiveUnits} />
        </UnitGroup>
      )}
    </div>
  );
}
