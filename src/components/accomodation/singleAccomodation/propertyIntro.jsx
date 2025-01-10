import { HomeParagraph, Title } from "@/components/texties";
import React from "react";

export default function PropertyIntro({property}) {
  return (
    <div className="psektion respons">
      {/* <Title className=" uppercase md:mt-5" subHeading="" first={property.slogan} /> */}
      <div className="sektion md:grid-cols-5">
        <div className=""></div>
        <div className="col-span-3">
          <HomeParagraph className=" md:text-center" content={property.desc} />
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
