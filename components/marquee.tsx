'use client';
import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/shadcn-io/marquee';

const images: string[] = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9fiy8VUqQL4Pm6ruBziQz6tRCDXnWR7o1Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDML5CFq70Y9FJ52YnyCjfdyUA3g9B6is_jA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAjouFTAB2PcXfnfkjy1SUjkaMeaymXnzoOA&s",
  // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxrLIzxV3WuZInUl2-gMcfpU27lGPQdGZDKw&s",
  "https://ui.aceternity.com/logo.png",
  "https://images.seeklogo.com/logo-png/31/1/amazon-web-services-aws-logo-png_seeklogo-319188.png"
]; 

const MarqueeExample = () => (
  <Marquee>
    <MarqueeContent>
      {/* {new Array(10).fill(null).map((_, index) => (
        <MarqueeItem className="h-16 w-16" key={index}>
          <img
            alt={`Placeholder ${index}`}
            className="overflow-hidden rounded-full"
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9fiy8VUqQL4Pm6ruBziQz6tRCDXnWR7o1Q&s`}
          />
        </MarqueeItem>
      ))} */}
        {
          images.map((val:string,index:number)=>(
            <MarqueeItem className="h-16 w-16 mx-3 lg:mx-6 md:mx-6" key={index}>
                <img
                  alt={`Placeholder ${index}`}
                  className="overflow-hidden rounded-full"
                  src={val}
                />
            </MarqueeItem>
          ))
        }

    </MarqueeContent>
  </Marquee>
);
export default MarqueeExample;
