import React from 'react'
import { HomeParagraph, Title } from '../texties';
import { ButtonLink, ButtonOne } from '../buttons';
import Link from 'next/link';
import { FaRocket } from 'react-icons/fa6';

export default function SuccessSection() {
  return (
    <div className="md:-mt-20 relative">
      <div className="respons sektion md:grid-cols-5 shadow-xl  bg-white">
        <div className="col-span-2 bg-pamojaprimary">
          <div className="p-10 ">
            <Title
              subHeading="Our Proud"
              first="25 years of undefeated success"
              className="md:text-start"
            />

            <HomeParagraph content="We have a long and proud history givin emphasis to environment social and economic outcomes to deliver places that respond." />
            <Link
              href="/contact"
              className="py-3 px-5 bg-pamojasecondary text-white"
            >
              Work With Us
            </Link>
          </div>
        </div>
        <div className="col-span-3">
          <div className="sektion md:grid-cols-2 place-items-center">
            <div className="flex items-center p-10 space-x-3 ">
              <div>
                <FaRocket size={32} className="text-pamojaprimary" />
              </div>
              <div className="flex-col">
                <Title className="text-start" first="46+" />
                <h5 className="text-start text-sm">Successfull Projects</h5>
              </div>
            </div>
            <div className="flex items-center p-10 space-x-3 ">
              <div>
                <FaRocket size={32} className="text-pamojaprimary" />
              </div>
              <div className="flex-col">
                <Title className="text-start" first="9+" />
                <h5 className="text-start text-sm">Years of Experience</h5>
              </div>
            </div>
            <div className="flex items-center p-10 space-x-3 ">
              <div>
                <FaRocket size={32} className="text-pamojaprimary" />
              </div>
              <div className="flex-col">
                <Title className="text-start" first="460+" />
                <h5 className="text-start text-sm">Happy Clients</h5>
              </div>
            </div>
            <div className="flex items-center p-10 space-x-3 ">
              <div>
                <FaRocket size={32} className="text-pamojaprimary" />
              </div>
              <div className="flex-col">
                <Title className="text-start" first="46+" />
                <h5 className="text-start text-sm">Successfull Projects</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}