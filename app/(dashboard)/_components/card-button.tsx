import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface CardButtonProps {
  href: string;
  children: ReactNode;
}

const CardButton: React.FC<CardButtonProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <Card>
        {/* <CardHeader></CardHeader> */}
        <CardContent>
          <div className="pt-6">
            {children}
          </div>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </Link>
  );
};

export default CardButton;
