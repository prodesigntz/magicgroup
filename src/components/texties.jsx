import React from "react";

export const HeaderTitle = ({ first, last, subHeading, className }) => {
  return (
    <div className="flex flex-col">
      <h5 className={`text-sm pb-5 text-center uppercase ${className}`}>
        {subHeading}
      </h5>
      <h1
        className={`font-bold gilda_display text-center text-2xl  md:text-6xl pb-4 ${className} `}
      >
        <span>{first}</span>
        &nbsp;
        <span className="text-irisonp">{last}</span>
      </h1>
    </div>
  );
};

export const Title = ({ first, last, subHeading, className }) => {
  return (
    <div className="flex flex-col">
      <h5
        className={`text-sm pb-5  text-center  barlow_init uppercase ${className}`}
      >
        {subHeading}
      </h5>
      <h1
        className={`font-bold gilda_display text-center  ${className} text-2xl  md:text-4xl pb-4`}
      >
        <span>{first}</span>
        &nbsp;
        <span className="text-irisonp">{last}</span>
      </h1>
    </div>
  );
};

export const HomeParagraph = ({ content, className }) => {
  return (
    <div 
      className={`pb-5 text-justify text-wrap text-lg antialiased ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
