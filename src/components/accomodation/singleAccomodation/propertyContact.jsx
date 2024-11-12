import { Title } from '@/components/texties';
import React from 'react'
import { FaEnvelope, FaMapLocationDot, FaPhone } from 'react-icons/fa6';

export default function PropertyContact({property}) {
  //console.log("Property locations", property.location);
  return (
    <section className="psektion ">
      <div className="respons sektion md:grid-cols-3">
        <div className="content-center space-y-5">
          <Title
            className="md:text-start"
            subHeading="Contact Us"
            first="Get In Touch"
          />
          <div className="flex-col space-y-2">
            <h1 className="text-2xl barlow_init">Address</h1>
            <div className="flex items-center space-x-2">
              <span>
                <FaMapLocationDot />
              </span>
              <h1>{property.address}</h1>
            </div>
          </div>
          <div className="flex-col space-y-2">
            <h1 className="text-2xl barlow_init">Phone</h1>
            <ul>
              {property.phones.map((contact, index) => (
                <li className="flex items-center space-x-1" key={index}>
                  <FaPhone /> <span>{contact || ""}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-col space-y-2">
            <h1 className="text-2xl barlow_init">Emails</h1>
            <ul>
              {property.emails.map((email, index) => (
                <li className="flex items-center space-x-1" key={index}>
                  <FaEnvelope /> <span>{email || ""}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 content-center overflow-hidden border border-pamojadark shadow">
          <iframe
            src={property.location}
            width="1000"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
