import { cn } from "@/lib/utils";
import { IReview } from "@/types";
import { Tab } from "@headlessui/react";
import { RenderStars } from "./render-stars";
import { format } from 'date-fns';

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
  return (
    <div className="flex border-y border-custom-green py-2">
      <div className="w-full max-w-md">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex gap-4">
            {tabs.map((tab, index) => (
              <Tab key={index} className="py-1 px-3">
                {({ selected }) => (
                  <div className={cn(selected && "font-bold")}>
                    {tab.title}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
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
