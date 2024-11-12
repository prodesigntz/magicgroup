import { updateDocumentArray } from "@/firebase/databaseOperations";
import React, { useState } from "react";

export default function AccomodationBookForm({ propertyID }) {
  const initialState = {
    checkin: "",
    checkout: "",
    adults: 1,
    children: 0,
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const [step, setStep] = useState(1); // Step 1 is the first step
  const [formData, setFormData] = useState(initialState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Move to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Move to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { checkin, checkout, adults, children } = formData;
    const newErrorMessages = {};

    // Validate date input
    if (new Date(checkin) >= new Date(checkout)) {
      newErrorMessages.checkin = "Check-out date must be after check-in date.";
    }
    if (adults + children === 0) {
      newErrorMessages.people = "At least one adult or child must be included.";
    }

    // If there are validation errors, update state and return
    if (Object.keys(newErrorMessages).length) {
      setErrorMessages(newErrorMessages);
      return;
    }

    try {
      // Creating form Data
      const toSubmitFormData = {
        ...formData,
        propertyID: propertyID,
        createdAt: new Date(),
      };

      // Save the data to the propertyID
      if (propertyID) {
        await updateDocumentArray(
          "Properties",
          propertyID,
          "bookings",
          toSubmitFormData
        );
        console.log("Booking successfully submitted");
        setFormData(initialState); // Reset form data
        setModalOpen(true); // Open confirmation modal
      } else {
        console.error("No Specific Property Selected");
      }
    } catch (error) {
      console.error("Form Not Submitted. Contact Support");
    }
  };

  return (
    <section className="md:absolute respons left-0 right-0 md:-mt-20">
      <div className="p-5 bg-pamojaprimary shadow-md">  
        {errorMessages.checkin && (
                  <p className="text-red-500 text-xs">
                    {errorMessages.checkin}
                  </p>
                )}
        <form
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Step Indicator */}
          <div className="md:col-span-4 mb-4">
            <p className="text-white">Step {step} of 2</p>
          </div>

          {step === 1 && (
            <>
              {/* Check-in Field */}
              <div>
                <label
                  htmlFor="checkin"
                  className="block text-sm font-medium text-white"
                >
                  Check-in
                </label>
                <input
                  type="date"
                  id="checkin"
                  name="checkin"
                  value={formData.checkin}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                  required
                  aria-label="Check-in date"
                />
              
              </div>

              {/* Check-out Field */}
              <div>
                <label
                  htmlFor="checkout"
                  className="block text-sm font-medium text-white"
                >
                  Check-out
                </label>
                <input
                  type="date"
                  id="checkout"
                  name="checkout"
                  value={formData.checkout}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                  required
                  aria-label="Check-out date"
                  
                />
              </div>

              {/* Number of Adults */}
              <div>
                <label
                  htmlFor="adults"
                  className="block text-sm font-medium text-white"
                >
                  Number of Adults
                </label>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  min="1"
                  value={formData.adults}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                  required
                  aria-label="Number of adults"
                  
                />
              </div>

              {/* Number of Children */}
              <div>
                <label
                  htmlFor="children"
                  className="block text-sm font-medium text-white"
                >
                  Number of Children
                </label>
                <input
                  type="number"
                  id="children"
                  name="children"
                  min="0"
                  value={formData.children}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                  aria-label="Number of children"
                  required
                />
              </div>

              {/* Next Step Button */}
              <div className="md:col-span-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full px-4 py-2 bg-pamojaaccent hover:bg-pamojasecondary text-pamojadark font-semibold rounded-none hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pamojaprimary"
                >
                  Book Now
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Name Field */}
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                  required
                  aria-label="Name"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                  required
                  aria-label="Phone number"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                  required
                  aria-label="Email"
                />
              </div>

              {/* Message Field */}
              <div className="md:col-span-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-black focus:outline-none focus:ring-pamojaprimary focus:border-pamojaprimary"
                />
              </div>

              {/* Previous and Submit Buttons */}
              <div className="md:col-span-4 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pamojaprimary"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pamojaaccent hover:bg-pamojasecondary text-pamojadark font-semibold rounded-none hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pamojaprimary"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">
              <h2 className="text-lg font-bold">Booking Successful</h2>
              <p>Thank you for your booking! We will contact you soon.</p>
              <button
                onClick={() => setModalOpen(false)}
                className="mt-4 px-4 py-2 bg-pamojaaccent hover:bg-pamojasecondary text-pamojadark font-semibold rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pamojaprimary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
