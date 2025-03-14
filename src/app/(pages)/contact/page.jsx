"use client";
import { Title } from "@/components/texties";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { createDocument } from "@/firebase/databaseOperations";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import useFetchAll from "@/lib/hooks/useFetchAll";
import PropertyContactDetails from "@/components/contactus/propertyContactDetails";

export default function Contact() {
  const { data, isLoading } = useFetchAll("Properties");

  //state.............................
  const [published, setPublished] = useState([]);
  const [drafts, setDrafts] = useState([]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
    checkboxWhatsApp: false,
    checkboxText: false,
    checkboxEmail: false,
    country: "",
    phone: "",
    clientType: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (
      !formData.fullname ||
      !formData.email ||
      !formData.message ||
      !formData.phone ||
      !formData.country ||
      !formData.clientType
    ) {
      setLoading(false);
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      // Add form data to Firebase Firestore
      await createDocument(formData, "Contactus");
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({
        fullname: "",
        email: "",
        message: "",
        checkboxWhatsApp: false,
        checkboxText: false,
        checkboxEmail: false,
        country: "",
        phone: "",
        clientType: "",
      });
    } catch (error) {
      setErrorMessage("Error sending message. Please try again.");
      console.error("Error adding document: ", error);
    }

    setLoading(false);
  };

  //console.log("Property Data from Contact:", data);

  return (
    <main className="">
      <section className="psektion text-white bg-[url('/images/pamoja/bornfire.jpeg')] bg-cover bg-center bg-slate-700 bg-blend-overlay bg-no-repeat">
        <div className="respons sektion md:grid-cols-3">
          <div></div>
          <div className="">
            <Title
              place=""
              subHeading="Contact Us"
              first="Let's Get in Touch"
            />
          </div>
        </div>

        <div className="respons sektion md:grid-cols-4">
          <div></div>
          <form
            className="col-span-2 p-5 text-pamojadark bg-white shadow-md space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="sektion md:grid-cols-3">
              <div className="space-y-5">
                <Input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                  className="w-full px-4 py-2 border border-pamojaprimary rounded-none"
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                  className="w-full px-4 py-2 border border-pamojaprimary rounded-none"
                />
                <Input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-2 border border-pamojaprimary rounded-none"
                />
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  className="w-full px-4 py-2 border border-pamojaprimary rounded-none"
                />
                <Input
                  type="text"
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  placeholder="I Am (Client Type)"
                  required
                  className="w-full px-4 py-2 border border-pamojaprimary rounded-none"
                />
              </div>

              <div className="col-span-2 space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-between space-x-2">
               
                    <input
                      type="checkbox"
                      name="checkboxWhatsApp"
                      checked={formData.checkboxWhatsApp}
                      onChange={handleCheckboxChange}
                      className="border border-pamojaprimary rounded-none"
                    />
                    <p className="text-sm text-pamojaprimary">WhatsApp</p>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                 
                    <input
                      type="checkbox"
                      name="checkboxText"
                      checked={formData.checkboxText}
                      onChange={handleCheckboxChange}
                      className="border border-pamojaprimary rounded-none"
                    />
                    <p className="text-sm text-pamojaprimary">Text</p>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
               
                    <input
                      type="checkbox"
                      name="checkboxEmail"
                      checked={formData.checkboxEmail}
                      onChange={handleCheckboxChange}
                      className="border border-pamojaprimary rounded-none"
                    />
                    <p className="text-sm text-pamojaprimary">Email</p>
                  </div>
                </div>
                <div className="sektion ">
                  <Input
                    type="text"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleChange}
                    placeholder="I Am (Client Type)"
                    required
                    className="w-full px-4 py-2 border border-pamojaprimary rounded-none"
                  />
                </div>

                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Message"
                  required
                  className="w-full px-4 py-2 rounded-none border border-pamojaprimary"
                />
              </div>
            </div>

            {/* Success and Error Messages */}
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center md:justify-start">
              <button
                type="submit"
                className="rounded-none text-center text-lg px-5 py-1.5 bg-pamojaprimary hover:bg-pamojadark gilda_display"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
          <div></div>
        </div>
      </section>

      {/* here we have the tab nation  according to the properties */}
      <section className="psektion">
        {data && data.length > 0 && (
          <Tabs
            defaultValue="magic-chemicals"
            className="respons sektion md:grid-cols-3"
          >
            <div className="relative bg-pamojaaccent md:col-span-1 md:p-5">
              <TabsList className=" rounded-none sektion  ">
                {data.map((property) => (
                  <TabsTrigger
                    key={property.id}
                    value={property.slug}
                    className="rounded-none text-center text-white text-xs px-5 py-1.5 bg-pamojaprimary hover:bg-pamojadark gilda_display"
                  >
                    {property.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {isLoading ? (
              <DashboardDataLoader />
            ) : (
              <div className="col-span-2">
                {data.map((property) => (
                  <TabsContent key={property.id} value={property.slug}>
                    <PropertyContactDetails property={property} />
                  </TabsContent>
                ))}
              </div>
            )}
          </Tabs>
        )}
      </section>
    </main>
  );
}
