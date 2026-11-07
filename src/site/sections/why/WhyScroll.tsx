import { WHY_TABS } from "../../data/why";
import { WhyBlock } from "./WhyBlock";

export function WhyScroll() {
  return (
    <section id="firma" className="scroll-mt-12 bg-white py-14 md:py-24">
      <div className="maxw flex flex-col gap-16 md:gap-36">
        {WHY_TABS.map((t) => (
          <WhyBlock key={t.id} tab={t} />
        ))}
      </div>
    </section>
  );
}
