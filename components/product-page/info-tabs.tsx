import { cn } from "@/lib/utils";
import { IReview } from "@/types";
import { Tab } from "@headlessui/react";
import { RenderStars } from "../render-stars";
import { format } from 'date-fns';
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface TabItem {
  title: string;
  content: string | IReview[];
}

interface InfoTabsProps {
  tabs: TabItem[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const InfoTabs = ({ tabs, activeTab, setActiveTab }: InfoTabsProps) => {
  const tabListRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabListRef.current) {
      const { scrollLeft, clientWidth } = tabListRef.current;
      const scrollAmount = clientWidth / 2;
      tabListRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex border-y border-custom-green py-2">
      <div className="w-full max-w-md">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <div className="relative">          
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 bg-white/70 shadow rounded-full"
              onClick={() => scrollTabs("left")}
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
           
            <Tab.List
              ref={tabListRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {tabs.map((tab, index) => (
                <Tab key={index} className="py-1 px-3 flex-shrink-0">
                  {({ selected }) => (
                    <div className={cn(selected && "font-bold")}>
                      {tab.title}
                    </div>
                  )}
                </Tab>
              ))}
            </Tab.List>
           
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 bg-white/70 shadow rounded-full"
              onClick={() => scrollTabs("right")}
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          <Tab.Panels className="mt-3">
            {tabs.map((tab, index) => (
              <Tab.Panel key={index} className="rounded-xl bg-white/5 p-3">
                {typeof tab.content === "string" ? (
                  <p>{tab.content}</p>
                ) : (
                  <ul>
                    {tab.content.map((rev) => (
                      <div key={rev.id}>
                        <RenderStars rating={rev.rating} />
                        <p>{rev.author}</p>
                        <p>{format(rev.created_at, "MMMM dd, yyyy")}</p>
                        <div>{rev.comment}</div>
                      </div>
                    ))}
                  </ul>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
