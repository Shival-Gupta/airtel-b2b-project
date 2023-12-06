"use client"

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bottom-0 w-full p-8 px-10 lg:px-32 border-t shadow-2xl bg-background flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-center">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center gap-12 text-sm">

          <div className="flex flex-col items-center">
            <p>Quick Access</p>
            <Button variant={"disabled"} className="text-xs">Retail Banking</Button>
            <Button variant={"disabled"} className="text-xs">Investor Relation</Button>
            <Button variant={"disabled"} className="text-xs">Terms and Condition</Button>
            <Button variant={"disabled"} className="text-xs">About Us</Button>
          </div>

          <div className="flex flex-col items-center">
            <p>Help at Hand</p>
            <Button variant={"disabled"} className="text-xs">
              Banking Points
            </Button>
            <Button variant={"disabled"} className="text-xs">
              Banking Security Tips
            </Button>
            <Button variant={"disabled"} className="text-xs">
              Fraud Awareness Scenarios
            </Button>
            <Button variant={"disabled"} className="text-xs">
              FAQs
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <p>Social Connect</p>
            <Button variant={"disabled"} className="text-xs">
              Facebook
            </Button>
            <Button variant={"disabled"} className="text-xs">
              Twitter
            </Button>
            <Button variant={"disabled"} className="text-xs">
              LinkedIn
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-4">Get in Touch</p>
            <Button variant={"ghost"} className="text-xs" disabled>
              <a href="tel:+918826688266">Contact us 24x7<br />8826688266</a>
            </Button>
            <Button variant={"ghost"} className="text-xs" disabled>
              <a href="mailto:corporatessupport@airtel">corporatessupport@airtel</a>
            </Button>
          </div>

        </div>
      </div>
    </footer>
  );
};
