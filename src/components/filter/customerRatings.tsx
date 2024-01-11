import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";

export const CustomerRatingsFilter = () => {
  return (
    <div className="p-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>CUSTOMER RATINGS</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              <li>
                <div className="flex items-center  space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="flex items-center gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    4 <Star fill="" size={16} /> & up
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center  space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="flex items-center gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    3 <Star fill="" size={16} /> & up
                  </label>
                </div>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
