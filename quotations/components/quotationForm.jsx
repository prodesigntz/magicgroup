"use client";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import MultipleReactSelection from "@/components/multipleReactSelection";
import SingleItemSelectionInput from "@/components/singleItemSelectionInput";
import { GoDot } from "react-icons/go";
import { useAppContext } from "@/context/AppContext";
import { isValidNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import QuotationCostDetails from "./quotationCostDetails";
import { useSearchParams } from "next/navigation";
import { getSingleDocument } from "@/firebase/databaseOperations";
import useFetchAll from "@/lib/hooks/useFetchAll";
import SectionTitle from "@/components/dashboard/sectionTitle";
import ItineraryMap from "./itineraryMap";
import ItineraryStaticMap from "./itineraryMapWithStaticMapApi";

const newItnItem = {
  accommodation: [],
  destinationId: "",
  destination: null,
  crewSize: 1,
  dayTrips: [],
  costs: [],
};

const initialBookingData = {
  fullName: "",
  email: "",
  phone: "",
  adultsNumber: 0,
  kidsNumber: 0,
  itineraryTitle: "",
  itineraryOverview: "",
};

const ItineraryForm = () => {
  const safariData = {
    logo: "https://serengetiwildlifesafaris.vercel.app/_next/image?url=%2Flogo.png&w=384&q=75",
    date: "2024-12-01",
    duration: "7 Days",
  };

  // Generate HTML content
  const generateHTML = () => {
    return `      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Safari itinerary quotation</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="p-6">
        <div class="mb-8">
          <img src="${
            safariData.logo
          }" alt="Company Logo" class="h-16 w-auto mb-4">
          <h1 class="text-3xl font-bold">${
            bookingData.itineraryTitle
              ? bookingData.itineraryTitle
              : " itinerary  title"
          }</h1>
          <p class="text-gray-600">Date: ${safariData.date}</p>
          <p class="text-gray-600">Duration: ${safariData.duration}</p>
        </div>
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-2">Safari Overview</h2>
          <p class="text-gray-700">${
            bookingData.itineraryOverview
              ? bookingData.itineraryOverview
              : " itinerary  overview"
          }</p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-4">Day By Day Itinerary</h2>
          ${tourItinerary
            .map(
              (day, index) => `
              <div class="mb-10">
                <h3 class="text-lg font-semibold">Day${index + 1}: Visiting ${
                day.destination ? day.destination.name : "destination ...."
              }</h3>
                <p class="text-gray-600 font-medium">Destination: ${
                  day.destination ? day.destination.name : "destination"
                }</p>
                
                <div class="flex gap-4 mt-2">
                  ${
                    day.destination &&
                    day.destination.photos
                      .map(
                        (image) =>
                          `<img src="${image}" alt="Destination Image" class="w-48 h-32 object-cover rounded shadow">`
                      )
                      .join("")
                  }
                </div>
                
                <div class="mt-4">
                  <h4 class="text-md font-medium">Accommodation</h4>
                  <p class="text-gray-600">${
                    day.accommodation.length > 0
                      ? day.accommodation[0].name
                      : "accommodation"
                  }</p>
                  <img src="${
                    day.accommodation.length > 0
                      ? day.accommodation[0].photos[0]
                      : ""
                  }" alt="Accommodation Image" class="w-48 h-32 object-cover rounded shadow mt-2">
                </div>
              </div>
            `
            )
            .join("")}
                      <div class="w-[70vw]">
                      <img src="${
                        imgUrl ? imgUrl : ""
                      }" alt="Accommodation Image" class="w-full h-auto object-cover rounded shadow mt-2"></div>
        </div>
      </body>
      </html>`;
  };

  const queryParams = useSearchParams();
  const bookingId = queryParams.get("bookingId");

  const [tourItinerary, setTourItinerary] = useState([
    { ...newItnItem, code: Date.now() },
  ]);
  const [bookingData, setBookingData] = useState(initialBookingData);
  const [safariIdeas, setSafariIdeas] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [campingCharges, setCampingCharges] = useState([]);

  //fetching neccessary component data...............    ..........   ........   ......

  const {
    fetchedAccommodations,
    fetchedDestinations,
    isLoading,
    fetchedDayTrips,
  } = useAppContext();

  const { data, isFetchingCampingCharges } = useFetchAll("camping-charges");
  useEffect(() => {
    if (data.length > 0) {
      const costCategories = data.map((itm) => ({
        title: itm.title,
        amount: 0,
      }));
      setCampingCharges(costCategories);
    }
  }, [data]);

  const [loading, setLoading] = useState(false);
  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      // Call the API to generate the PDF
      // const response = await fetch("/api/generate-quotation-pdf");

      const response = await fetch("/api/generate-quotation-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: generateHTML() }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      // Get the blob data for the PDF
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "student-grades.pdf";
      document.body.appendChild(a);
      a.click();

      // Clean up the link after download
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  //.................    ............. .........    ..........   ........  ....... ....
  //find destination from fetched destinations .........
  const findDst = (dstnId) => {
    const dst = fetchedDestinations.find((item) => item.id === dstnId);
    return dst;
  };

  //find accommodation from fetched accommodations.................
  const findAccm = (accmId) => {
    const acm = fetchedAccommodations.find((item) => item.id === accmId);
    return acm;
  };

  //find accommodation from fetched accommodations.................
  const findDayTrip = (tripId) => {
    const trip = fetchedDayTrips.find((item) => item.id === tripId);
    return trip;
  };

  //booking  incase we started from the booking...................
  useEffect(() => {
    const fetchBooking = async () => {
      setIsFetchingData(true);
      const rs = await getSingleDocument("bookings", bookingId);

      if (rs.didSucceed) {
        const fetchedBookingData = rs.document;
        console.log("booking data................", fetchedBookingData);
        const { advCustomizationData } = fetchedBookingData;

        //         advancedCustomizationData format = {
        //         dayTrips:[ids],
        //         addedItinerary: [{destinationId,accommodationId}],
        //         itinerary: selectedTour ,
        // }

        // safari ideas .............................................
        //         safariIdeas: [],
        // additionalDetails: "",

        const duration = fetchedBookingData.duration;
        let itn = [];

        if (
          !advCustomizationData ||
          (!advCustomizationData.itinerary &&
            advCustomizationData.addedItinerary.length === 0)
        ) {
          //no itinerary data from advanced  customization,,,,,...............(we just add itn rows based on number of days (duration)).........

          for (let index = 0; index < duration; index++) {
            itn = [...itn, { ...newItnItem, code: Date.now(), campingCharges }];
          }
        } else {
          //at least new destinations or a tour was selected by a user........we populate them .....
          if (advCustomizationData.itinerary) {
            //user customized a premade itinerary (tour)..............................................
            const selectedItn = advCustomizationData.itinerary.itinerary.map(
              (itnItem) => {
                const dstn = findDst(itnItem.destinationId);
                const accm = findAccm(itnItem.accommodationId);
                return {
                  ...newItnItem,
                  code: Date.now(),
                  campingCharges: itnItem.campingCharges
                    ? itnItem.campingCharges
                    : campingCharges,
                  destinationId: itnItem.destinationId,
                  destination: dstn,
                  accommodation: itnItem.accommodationId
                    ? [
                        {
                          ...accm,
                          appliedRates: { roomIndex: 0, isSto: false },
                          bookedRooms: [],
                        },
                      ]
                    : [],
                };
              }
            );

            itn = [...selectedItn];
          }

          if (advCustomizationData.addedItinerary.length > 0) {
            //user added other destinations to his itinerary.......
            const formattedAddedItn = advCustomizationData.addedItinerary.map(
              (itm) => {
                const dstn = findDst(itm.destinationId);
                const accm = findAccm(itm.accommodationId);
                return {
                  ...newItnItem,
                  code: Date.now(),
                  campingCharges,
                  destinationId: itm.destinationId,
                  destination: dstn,
                  accommodation: itm.accommodationId
                    ? [
                        {
                          ...accm,
                          appliedRates: { roomIndex: 0, isSto: false },
                          bookedRooms: [],
                        },
                      ]
                    : [],
                };
              }
            );
            itn = [...itn, ...formattedAddedItn];
          }
        }

        //day trips.............................
        let activities = [];
        if (
          fetchedDayTrips.length > 0 &&
          advCustomizationData &&
          advCustomizationData.dayTrips.length > 0
        ) {
          //we have day trips....................
          activities = advCustomizationData.dayTrips.map((tripId) => {
            const trip = fetchedDayTrips.find((itm) => itm.id === tripId);
            if (trip) return trip.title;
            return "";
          });

          activities = activities.filter((trip) => trip !== "");
        }

        setTourItinerary(itn);
        setSafariIdeas({
          additionalDetails: fetchedBookingData.additionalDetails,
          safariIdeas: fetchedBookingData.safariIdeas,
          dayTrips: activities,
        });
        setBookingData((prevState) => ({
          ...prevState,
          fullName: fetchedBookingData.fullName,
          email: fetchedBookingData.email,
          phone: fetchedBookingData.phone,
          adultsNumber: fetchedBookingData.adults,
          kidsNumber: fetchedBookingData.kids,
          itineraryTitle:
            advCustomizationData && advCustomizationData.itinerary
              ? advCustomizationData.itinerary.title
              : "",
          // itineraryOverview: advCustomizationData.itinerary
          //   ? advCustomizationData.itinerary.overview
          //   : "",
        }));
      }

      setIsFetchingData(false);
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId, isLoading]);

  //booking details.............. ..........   ....................   ............... ..

  const handleChange = (name, value) => {
    if (name === "kidsNumber" || name === "adultsNumber") {
      if (!isValidNumber(value) && value !== "") return;
    }

    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddItineraryItem = () => {
    // const updatedItn = [...tourItinerary, { ...newItnItem, code: Date.now() }];
    setTourItinerary((prevState) => [
      ...prevState,
      { ...newItnItem, code: Date.now(), campingCharges },
    ]);
  };

  const handleItineraryChange = (name, value, index) => {
    let itnr = [...tourItinerary];
    let updatedItnItem = {};

    if (name === "destination") {
      const dst = fetchedDestinations.find((item) => item.id === value);
      updatedItnItem = {
        ...itnr[index],
        destination: dst,
        destinationId: value,
        accommodation: [],
        dayTrips: [],
      };
    }

    if (name === "accommodation") {
      const accms = value.map((accmId) => {
        const accm = findAccm(accmId);
        return {
          ...accm,
          appliedRates: { roomIndex: 0, isSto: false },
          bookedRooms: [],
        };
      });

      updatedItnItem = {
        ...itnr[index],
        accommodation: accms,
        campingCharges,
      };
    }

    if (name == "dayTrips") {
      updatedItnItem = {
        ...itnr[index],
        [name]: value,
      };
    }
    if (name == "crewSize") {
      updatedItnItem = {
        ...itnr[index],
        [name]: value,
      };
    }

    itnr[index] = updatedItnItem;

    setTourItinerary((prevState) => itnr);
  };

  //update camping charges.............................................
  const handleCampingChargesUpdate = (itnItemIndex, charges) => {
    setTourItinerary((prevState) => {
      const updatedItn = prevState.map((itm, index) => {
        if (index === itnItemIndex) {
          return { ...itm, campingCharges: charges };
        }
        return itm;
      });

      return updatedItn;
    });
  };

  //delete itinerary item.................................
  const handleDeleteItineraryItem = async (index) => {
    setTourItinerary((prevState) => {
      const uptdItn = prevState.filter(
        (item, itemIndex) => itemIndex !== index
      );
      return uptdItn;
    });
  };
  //const getLinkedTrips...................................
  const getLinkedTrips = (dstnId) => {
    if (fetchedDayTrips.length >= 1) {
      const linkeTrips = fetchedDayTrips.filter((trip) => {
        if (trip.destinations.includes(dstnId)) return true;
        return false;
      });
      return linkeTrips;
    }
    return [];
  };

  //get accommodation images...............................
  const getAccommodationImages = (accmId) => {
    const accm = fetchedAccommodations.find((item) => item.id == accmId);
    return accm.photos;
  };
  //get accommodation images.............
  const getDstnImages = (dsIndex) => {
    const dstn = fetchedDestinations.find((item) => item.id == dsIndex);
    return dstn.photos;
  };

  const getDstnAccommodations = (dstnId) => {
    const dstnAccms = fetchedAccommodations.filter(
      (itm) => itm.destinationId === dstnId
    );

    const otherAccms = fetchedAccommodations.filter(
      (itm) => itm.destinationId !== dstnId
    );
    return [...dstnAccms, ...otherAccms];
  };

  //price and cost settings...................
  const handlePriceUpdate = () => {
    console.log("price updated");
  };

  const handleQuoteGenerate = () => {
    console.log("handle quotation generate  btn clicked");
  };

  if (isLoading || isFetchingData || isFetchingCampingCharges)
    return <DashboardDataLoader />;

  if (
    !isLoading &&
    (fetchedAccommodations.length == 0 || fetchedDestinations.length == 0)
  ) {
    return (
      <div className="flex items-center justify-center w-full mt-11">
        <p className="text-xl">
          {" "}
          Some neccessary data for this page have not been fetched.
        </p>
      </div>
    );
  }

  // const safariLocations = [
  //   { name: "Dar es Salaam", coordinates: [-6.829563, 39.278995] },
  //   { name: "Mikumi National Park", coordinates: [-7.189831, 37.469431] },
  //   { name: "Tarangire National Park", coordinates: [-4.162858, 36.08993] },
  //   { name: "Lake Manyara National Park", coordinates: [-3.607861, 35.75758] },
  //   { name: "Ngorongoro Crater", coordinates: [-3.155476, 35.576657] },
  //   { name: "Serengeti National Park", coordinates: [-2.333462, 34.83329] },
  //   { name: "Zanzibar City", coordinates: [-6.166923, 39.333419] },
  // ];

  const [imgUrl, setMapImg] = useState(null);

  const destinations = [
    {
      latitude: -6.7924,
      longitude: 39.2083,
      name: "Dar es Salaam",
      day: "Start",
    },
    {
      latitude: -4.1437219,
      longitude: 35.7225609,
      name: "Tarangire NP",
      day: "Day 1-2",
    },
    {
      latitude: -3.1661679,
      longitude: 35.5437669,
      name: "Ngorongoro Crater",
      day: "Day 3",
    },
    {
      latitude: -2.3333333,
      longitude: 34.8307584,
      name: "Serengeti NP",
      day: "Day 4",
    },
    {
      latitude: -3.6077859,
      longitude: 35.7369594,
      name: "Lake Manyara NP",
      day: "Day 5",
    },
    {
      latitude: -3.0674244,
      longitude: 37.3350277,
      name: "Mount Kilimanjaro",
      day: "End",
    },
  ];

  const handleMapCapture = (imgUrl) => {
    setMapImg(imgUrl);
    // console.log("the img url ", imgUrl);
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-md  mx-auto">
      <ItineraryMap
        onMapCapture={handleMapCapture}
        destinations={destinations}
      />

      {/* <ItineraryStaticMap
        onMapCapture={handleMapCapture}
        destinations={destinations}
      /> */}
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Customer Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 flex-grow items-center">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={bookingData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="First Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={bookingData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Phone Number"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="adultsNumber">
            Number Of Adults
          </label>
          <input
            type="text"
            id="adultsNumber"
            name="adultsNumber"
            value={bookingData.adultsNumber}
            onChange={(e) => handleChange("adultsNumber", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Adults Number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="kidsNumber">
            Number Of Kids
          </label>
          <input
            type="text"
            id="kidsNumber"
            name="kidsNumber"
            value={bookingData.kidsNumber}
            onChange={(e) => handleChange("kidsNumber", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      <SectionTitle title=" Safari Itinerary" classes="mb-6" />

      <div className="my-4">
        <input
          type="text"
          id="title"
          name="itineraryTitle"
          value={bookingData.itineraryTitle}
          onChange={(e) => handleChange("itineraryTitle", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Tour Title"
          required
        />
      </div>

      <div>
        <textarea
          id="itineraryOverview"
          value={bookingData.itineraryOverview}
          onChange={(e) => handleChange("itineraryOverview", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter a brief overview of what this tour will be about..."
          rows="4"
        ></textarea>
      </div>

      <hr className="my-2" />

      {safariIdeas && (
        <>
          {" "}
          <SectionTitle title=" Customer Safari Ideas" classes="mt-7" />
          <div className="pb-2">
            {safariIdeas.safariIdeas.length > 0 && (
              <div>
                <p className="font-semibold">Safari Types</p>

                {safariIdeas.safariIdeas.map((itm, index) => {
                  return (
                    <div key={index} className="flex gap-5 items-center">
                      <GoDot />
                      <p>{itm} </p>
                    </div>
                  );
                })}
              </div>
            )}

            {safariIdeas.dayTrips.length > 0 && (
              <div className="mt-4 py-3">
                <p className="font-semibold mb-3">Day Trips</p>

                {safariIdeas.dayTrips.map((trip, index) => {
                  return (
                    <div key={index} className="flex gap-3 items-center">
                      <GoDot />
                      <p>{trip} </p>
                    </div>
                  );
                })}
              </div>
            )}

            {safariIdeas.additionalDetails && (
              <div className="mt-4 py-3">
                <p className="font-semibold">Additional details</p>
                <p>{safariIdeas.additionalDetails} </p>
              </div>
            )}
          </div>
          <hr className="my-2" />{" "}
        </>
      )}

      {tourItinerary.map((itnItem, itnIndex) => {
        {
          /* itinerary item...................     .........  ........    */
        }

        const itnDstn = itnItem.destinationId
          ? findDst(itnItem.destinationId)
          : undefined;

        const formattedDstn = itnDstn
          ? {
              id: itnIndex,
              label: itnDstn.name,
              value: itnDstn.id,
            }
          : null;

        const formattedAccm =
          itnItem.accommodation.length > 0
            ? itnItem.accommodation.map((itm, indx) => ({
                id: indx,
                label: itm.name,
                value: itm.id,
              }))
            : [];

        return (
          <div key={itnIndex}>
            <p className="my-4 font-bold text-lg italic text-procolor">
              Day {1 + itnIndex}
            </p>

            <div className="flex items-center justify-between gap-2 md:gap-11">
              <div className=" grid grid-cols-1 md:grid-cols-8 gap-6 mb-6 flex-grow items-center">
                <div className="col-span-2">
                  {fetchedDestinations.length > 0 && (
                    <SingleItemSelectionInput
                      initialFormatedData={itnDstn ? formattedDstn : null}
                      label="Destination"
                      handleItemChange={(value) =>
                        handleItineraryChange("destination", value, itnIndex)
                      }
                      options={fetchedDestinations.map((itm, indx) => ({
                        id: indx,
                        label: itm.name,
                        value: itm.id,
                      }))}
                    />
                  )}
                </div>
                <div className="col-span-2">
                  {itnItem.destinationId ? (
                    <div>
                      <MultipleReactSelection
                        label="Accommodations"
                        initialFormatedData={
                          formattedAccm.length > 0 ? formattedAccm : null
                        }
                        handleItemsChange={(value) =>
                          handleItineraryChange(
                            "accommodation",
                            value,
                            itnIndex
                          )
                        }
                        options={getDstnAccommodations(
                          itnItem.destinationId
                        ).map((itm, indx) => ({
                          id: indx,
                          label: itm.name,
                          value: itm.id,
                        }))}
                      />
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <p className="text-sm ">---</p>{" "}
                    </div>
                  )}
                </div>
                <div>
                  {itnItem.destinationId ? (
                    <div>
                      {" "}
                      <label className="block">Crew Size</label>
                      <input
                        type="text"
                        className="w-full  p-1.5 border border-gray-300 rounded"
                        name="crewSize"
                        value={itnItem.crewSize}
                        onChange={(e) => {
                          if (
                            !isValidNumber(e.target.value) &&
                            e.target.value !== ""
                          )
                            return;
                          handleItineraryChange(
                            "crewSize",
                            e.target.value,
                            itnIndex
                          );
                        }}
                        required
                      />{" "}
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <p className="text-sm ">---</p>{" "}
                    </div>
                  )}
                </div>
                <div className="md:col-span-3">
                  {itnItem.destinationId && fetchedDayTrips ? (
                    <div>
                      {getLinkedTrips(itnItem.destinationId).length > 0 ? (
                        <MultipleReactSelection
                          handleItemsChange={(value) =>
                            handleItineraryChange("dayTrips", value, itnIndex)
                          }
                          label="Available Day Trips"
                          options={getLinkedTrips(itnItem.destinationId).map(
                            (itm, indx) => ({
                              id: indx,
                              label: itm.title,
                              value: itm.id,
                            })
                          )}
                        />
                      ) : (
                        <div>
                          {" "}
                          <p className="text-sm ">
                            No available day trips
                          </p>{" "}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <p className="text-sm ">---</p>{" "}
                    </div>
                  )}
                </div>{" "}
              </div>

              <div className="flex items-center justify-center">
                <button
                  style={{ cursor: "pointer" }}
                  className="hover:bg-red-300 p-2 rounded-md "
                  onClick={() => handleDeleteItineraryItem(itnIndex)}
                >
                  <FaTrash className="text-red-700" />{" "}
                </button>
              </div>
            </div>
          </div>
        );
        {
          /* end of itinerary item................ */
        }
      })}

      <div className="block">
        <button
          onClick={handleAddItineraryItem}
          className="bg-protertiary text-procolor mb-3 hover:bg-proprimary hover:text-white rounded p-2"
        >
          <FaPlus />
        </button>
      </div>
      <hr className="mb-4" />

      <QuotationCostDetails
        itinerary={tourItinerary}
        kidsNumber={bookingData.kidsNumber}
        adultsNumber={bookingData.adultsNumber}
        onPriceUpdate={handlePriceUpdate}
        onCampingChargesUpdate={handleCampingChargesUpdate}
      />
      <button
        onClick={handleDownloadPDF}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition duration-300 mt-11"
      >
        {loading ? "Generating PDF..." : "Generate quotation"}
      </button>
    </div>
  );
};

export default ItineraryForm;
