import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { faqs } from "../../Data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const CardandFaqs = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* cards */}

        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, get matched with the right job and get
            hired.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Hirers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs, manage applications and find the best candidate.</p>
          </CardContent>
        </Card>

        {/* accordion */}

        <Accordion className="col-span-2">
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </>
  );
};

export default CardandFaqs;
