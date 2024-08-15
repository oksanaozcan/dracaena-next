import { ChevronDownIcon } from "lucide-react";
import Container from "../ui/container";
import { Disclosure } from "@headlessui/react";
import { ReactNode } from "react";

interface MobileDisclosureProps {
  title: string;
  component: ReactNode;
}

export const MobileDisclosure: React.FC<MobileDisclosureProps> = ({ title, component }) => {
  return (
    <div className="border-t border-slate-700">
      <Container>
        <Disclosure>
          <Disclosure.Button className="w-full p-4 flex justify-between items-center">
            {title} <ChevronDownIcon className="w-5 ui-open:rotate-180" />
          </Disclosure.Button>
          <Disclosure.Panel className="p-4">{component}</Disclosure.Panel>
        </Disclosure>
      </Container>
    </div>
  );
};
