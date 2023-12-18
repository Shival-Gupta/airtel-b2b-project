"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const aboutUrl = "https://shival-gupta.github.io/";

export const Footer = () => {
  return (
    <footer className="bottom-0 w-full border-t shadow-2xl bg-background flex-row items-center">
      <div className="md:max-w-screen-2xl p-8 px-10 lg:px-32 mx-auto flex items-center w-full justify-center">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center gap-12 text-sm">

          <div className="flex flex-col items-center">
            <p>Quick Access</p>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>About Us</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Retail Banking</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Investor Relation</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Terms and Condition</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <p>Help at Hand</p>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Banking Points</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Banking Security Tips</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Fraud Awareness Scenarios</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>FAQs</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <p>Social Connect</p>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Facebook</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>Twitter</Link>
            </Button>
            <Button variant={"disabled"} className="text-xs" asChild>
              <Link href={aboutUrl} target='_blank'>LinkedIn</Link>
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
      <div className="flex py-2 text-sm bg-accent text-accent-foreground justify-center items-center">
        <p>
          Designed & Built by{" "}
          <Link href={aboutUrl} target='_blank' className="font-semibold text-primary hover:underline">
            Shival Gupta
          </Link>
        </p>
      </div>
    </footer>
  );
};
