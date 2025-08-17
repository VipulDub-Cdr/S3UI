'use client';
import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/shadcn-io/marquee';
const MarqueeExample = () => (
  <Marquee>
    <MarqueeContent>
      {new Array(10).fill(null).map((_, index) => (
        <MarqueeItem className="h-16 w-16" key={index}>
          <img
            alt={`Placeholder ${index}`}
            className="overflow-hidden rounded-full"
            src={`https://placehold.co/64x64?random=${index}`}
          />
        </MarqueeItem>
      ))}
    </MarqueeContent>
  </Marquee>
);
export default MarqueeExample;
