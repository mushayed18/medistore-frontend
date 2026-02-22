import type { IconType } from "react-icons";
import { TbPill } from "react-icons/tb";
import { GoHeart } from "react-icons/go";
import { PiLeaf } from "react-icons/pi";
import { LuHeartPulse } from "react-icons/lu";
import { TbTestPipe } from "react-icons/tb";
import { GoBriefcase } from "react-icons/go";

interface Category {
  icon: IconType;
  name: string;
}

const categories: Category[] = [
  { icon: TbPill, name: "Medicine" },
  { icon: GoHeart, name: "Health care" },
  { icon: PiLeaf, name: "Beauty care" },
  { icon: LuHeartPulse, name: "Fitness" },
  { icon: TbTestPipe, name: "Lab equipment" },
  { icon: GoBriefcase, name: "Medkits" },
];

export default function ShopByCategory() {
  return (
    <section className="bg-secondary px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center font-serif text-3xl text-primary md:mb-14 md:text-4xl">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ icon: Icon, name }) => (
            <div key={name}
            >
              {/* Outer ring with dashed border */}
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-[1.5px] border-dashed border-primary/30 transition-colors group-hover:border-primary/60">
                {/* Inner filled circle */}
                <div className="flex h-18 w-18 items-center justify-center rounded-full bg-primary/[0.07] transition-colors group-hover:bg-primary/12">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-primary">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
