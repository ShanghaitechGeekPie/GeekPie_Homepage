import cs from "classnames";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { features } from "@/statics/home";

export function BentoAbout({ className }: { className?: string }) {
    return (
        <BentoGrid className={cs(`lg:grid-rows-[280px_minmax(200px,1fr)_200px]`, className)}>
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}
