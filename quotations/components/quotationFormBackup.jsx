"use client";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import MultipleReactSelection from "@/components/multipleReactSelection";
import SingleItemSelectionInput from "@/components/singleItemSelectionInput";
import { useAppContext } from "@/context/AppContext";
import { isValidNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import QuotationCostDetails from "./quotationCostDetails";
import { useSearchParams } from "next/navigation";
import { getSingleDocument } from "@/firebase/databaseOperations";

const newItnItem = {
  accommodationId: "",
  accommodation: null,
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
  const queryParams = useSearchParams();
  const bookingId = queryParams.get("bookingId");

  const [tourItinerary, setTourItinerary] = useState([newItnItem]);
  const [bookingData, setBookingData] = useState(initialBookingData);
  const [isFetchingData, setIsFetchingData] = useState(false);

  //fetching neccessary component data...............    ..........   ........   ......
  const {
    fetchedAccommodations,
    fetchedDestinations,
    isLoading,
    fetchedDayTrips,
    fetchDayTrips,
  } = useAppContext();

  //.................    ............. .........    ..........   ........  ....... ....

  const findDst = (dstnId) => {
    const dst = fetchedDestinations.find((item) => item.id === dstnId);
    return dst;
  };

  const findAccm = (accmId) => {
    const acm = fetchedAccommodations.find((item) => item.id === accmId);
    return acm;
  };

  //day trips..............................
  useEffect(() => {
    if (fetchedDayTrips.length === 0) {
      fetchDayTrips();
    }
  }, []);

  //booking  incase we started from the booking......
  useEffect(() => {
    const fetchBooking = async () => {
      setIsFetchingData(true);
      const rs = await getSingleDocument("bookings", bookingId);
      if (rs.didSucceed) {
        const fetchedBookingData = rs.document;
        console.log("fetched booking data ", fetchedBookingData);
        const { advCustomizationData } = fetchedBookingData;

        const duration = fetchedBookingData.duration;
        let itn = [];

        if (
          !advCustomizationData.itinerary &&
          advCustomizationData.addedItinerary.length === 0
        ) {
          //no itinerary data from advanced  customization,,,,,...............(we just add itn rows based on number of days (duration)).........
          for (let index = 0; index < duration; index++) {
            itn = [...itn, newItnItem];
          }
        } else {
          //at least new destinations or a tour was selected by a user........we populate them .....
          if (advCustomizationData.itinerary) {
            //user customized a premade itinerary (tour)

            const selectedItn = advCustomizationData.itinerary.itinerary.map(
              (itnItem) => {
                const dstn = findDst(itnItem.destinationId);
                const accm = findAccm(itnItem.accommodationId);

                return {
                  destinationId: itnItem.destinationId,
                  destination: dstn,
                  accommodation: itnItem.accommodationId
                    ? {
                        ...accm,
                        appliedRates: { roomIndex: 0, isSto: false },
                      }
                    : "",
                  accommodationId: itnItem.accommodationId
                    ? itnItem.accommodationId
                    : "",
                  costs: [],
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
                  ...itm,
                  costs: [],
                  destination: dstn,
                  accommodation: itm.accommodationId
                    ? {
                        ...accm,
                        appliedRates: { roomIndex: 0, isSto: false },
                      }
                    : "",
                };
              }
            );
            itn = [...itn, ...formattedAddedItn];
          }
        }

        setTourItinerary(itn);

        console.log("final itinerary", itn);

        setBookingData((prevState) => ({
          ...prevState,
          fullName: fetchedBookingData.fullName,
          email: fetchedBookingData.email,
          phone: fetchedBookingData.phone,
          adultsNumber: fetchedBookingData.adults,
          kidsNumber: fetchedBookingData.kids,
          itineraryTitle: advCustomizationData.itinerary
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
  }, [bookingId]);

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

  const handleItineraryChange = (name, value, index) => {
    let itnr = [...tourItinerary];
    let updatedItnItem = {};

    if (name == "destination") {
      const dst = fetchedDestinations.find((item) => item.id === value);

      updatedItnItem = {
        ...itnr[index],
        destination: dst,
        destinationId: value,
        accommodationId: "",
        accommodation: null,
        dayTrips: [],
      };
    }

    if (name == "accommodationId") {
      const accm = fetchedAccommodations.find((item) => item.id === value);

      updatedItnItem = {
        ...itnr[index],
        accommodation: {
          ...accm,
          appliedRates: { roomIndex: 0, isSto: false },
        },
        accommodationId: value,
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

  const handleAddItineraryItem = () => {
    const updatedItn = [...tourItinerary, newItnItem];
    setTourItinerary(updatedItn);
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
    const linkeTrips = fetchedDayTrips.filter((trip) => {
      if (trip.destinations.includes(dstnId)) return true;
      return false;
    });
    return linkeTrips;
  };

  //get accommodation images...............................
  const getAccommodationImages = (accmId) => {
    const accm = accommodations.find((item) => item.id == accmId);
    return accm.photos;
  };
  //get accommodation images.............
  const getDstnImages = (dsIndex) => {
    const dstn = destinations.find((item) => item.id == dsIndex);
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

  const handleQuoteGenerate = () => {};

  if (isLoading || isFetchingData) return <DashboardDataLoader />;

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

  return (
    <div className="p-8 bg-white shadow-md rounded-md  mx-auto">
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

      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Safari Itinerary
      </h2>

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

        const itnAccm = findAccm(itnItem.accommodationId);

        console.log("itn accm", itnAccm);
        console.log("itn accm id", itnItem.accommodationId);

        const formattedAccm = itnAccm
          ? {
              id: itnIndex,
              label: itnAccm.name,
              value: itnAccm.id,
            }
          : null;

        return (
          <div key={itnIndex}>
            <p className="my-4 font-bold text-lg italic text-procolor">
              Day {1 + itnIndex}
            </p>

            <div className="flex items-center justify-between gap-2 md:gap-11">
              <div className=" grid grid-cols-1 md:grid-cols-5 gap-6 mb-6 flex-grow items-center">
                <div>
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
                <div>
                  {itnItem.destinationId ? (
                    <div>
                      {" "}
                      {getDstnAccommodations(itnItem.destinationId).length >
                      0 ? (
                        <SingleItemSelectionInput
                          label="Accommodations"
                          initialFormatedData={itnAccm ? formattedAccm : null}
                          handleItemChange={(value) =>
                            handleItineraryChange(
                              "accommodationId",
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
                      ) : (
                        <div>
                          {" "}
                          <p className="text-sm ">
                            No available accommodations
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
                <div className="md:col-span-2">
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
      />

      <button
        onClick={handleQuoteGenerate}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition duration-300 mt-11"
      >
        Generate Quotation
      </button>
    </div>
  );
};

export default ItineraryForm;
