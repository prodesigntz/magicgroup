"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { deleteMultipleImagesFromFirebase } from "@/firebase/fileOperations";
import { fetchDocuments } from "@/firebase/databaseOperations";
import ImagesUploadSection from "./tour-images-section";

const ItinerarySection = ({ onUpdateItinerary, initialData }) => {
  const [destinations, setDestinations] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [tourItinerary, setTourItinerary] = useState([]);

  //checking if initial data was provided........................................
  useEffect(() => {
    if (initialData) {
      setTourItinerary(initialData);
    }
  }, [initialData]);

  //fetching desns and accommds.....
  const getData = async () => {
    const rs = await Promise.all([
      fetchDocuments("destinations"),
      fetchDocuments("accommodations"),
    ]);
    setIsFetchingData(false);
    const dstRs = rs[0];
    const accommRs = rs[1];

    let rsDestinations = dstRs.items;
    let rsAccommodations = accommRs.items;

    setDestinations(() => rsDestinations);
    setAccommodations(() => rsAccommodations);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleItineraryChange = (event, index) => {
    const { name, value } = event.target;
    if (!value) return;

    let itnr = tourItinerary;
    let updatedItnItem = {};
    if (name == "destinationId") {
      const dst = destinations.find((item) => item.id === value);
      updatedItnItem = {
        ...itnr[index],
        destination: dst,
        accommodationId: "",
        [name]: value,
      };
    } else if (name == "accommodationId") {
      const accm = accommodations.find((item) => item.id === value);

      updatedItnItem = {
        ...itnr[index],
        accommodation: { ...accm, appliedRates: { roomIndex: 0, isSto: true } },
        [name]: value,
      };
    } else {
      updatedItnItem = {
        ...itnr[index],
        [name]: value,
      };
    }

    itnr[index] = updatedItnItem;
    setTourItinerary((prevState) => itnr);
    onUpdateItinerary(itnr);
  };

  const handleAddItineraryItem = () => {
    const updatedItn = [
      ...tourItinerary,
      {
        title: "",
        description: "",
        accommodationId: "",
        destinationId: "",
        photos: [],
        customTitle: "",
        customValue: "",
        costs: [],
      },
    ];

    setTourItinerary(updatedItn);
    onUpdateItinerary(updatedItn);
  };

  //delete itinerary item..............................
  const handleDeleteItineraryItem = async (index) => {
    const itnToDelete = tourItinerary[index];

    //delete item's images first if there is any....
    if (itnToDelete.photos.length > 0) {
      // let rsMessage = "Document successfully deleted";
      try {
        await Promise.all(deleteMultipleImagesFromFirebase(itnToDelete.photos));
      } catch (error) {
        console.log("error deleteing itinerary images", error);
        // rsMessage = "something went wrong when deleting images";
      }
    }

    const getNewItn = (itn) => {
      const uptdItn = itn.filter((item, itemIndex) => itemIndex !== index);
      return uptdItn;
    };
    //update itn on the parent component (add or edit tour page)
    const uItn = getNewItn(tourItinerary);
    onUpdateItinerary(uItn);
    //update itn state within itn component (this)
    setTourItinerary((prevState) => {
      const updatedItinerary = getNewItn(prevState);
      return updatedItinerary;
    });
  };

  //add itinerary item image.....................
  const handleAddIPhoto = (index, imgUrl) => {
    setTourItinerary((prevState) => {
      const updatedItinerary = prevState.map((item, itemIndex) => {
        if (itemIndex === index) {
          return { ...item, photos: [...item.photos, imgUrl] };
        }
        return item;
      });

      onUpdateItinerary(updatedItinerary);
      return updatedItinerary;
    });
  };
  //delete itinerary item image.....................
  const handleDeleteIPhoto = (index, imgUrl) => {
    setTourItinerary((prevState) => {
      const updatedItinerary = prevState.map((item, itemIndex) => {
        if (itemIndex === index) {
          const newImgsList = item.photos.filter((img) => img !== imgUrl);
          return { ...item, photos: newImgsList };
        }
        return item;
      });

      onUpdateItinerary(updatedItinerary);
      return updatedItinerary;
    });
  };

  //get accommodation images.............
  const getAccommodationImages = (accmId) => {
    const accm = accommodations.find((item) => item.id == accmId);
    return accm.photos;
  };

  //get accommodation images.............
  const getDstnImages = (dsIndex) => {
    const dstn = destinations.find((item) => item.id == dsIndex);
    return dstn.photos;
  };

  if (isFetchingData) {
    return <p>.....</p>;
  }

  return (
    <div className="space-y-5 pt-10">
      {/*day details */}
      <div className="space-y-5">
        {tourItinerary.length > 0 && (
          <div className="bg-gradient-to-r px-3 from-protertiary to-transparent border border-t-procolor border-b-procolor border-r-transparent border-l-transaparent space-y-2 py-2">
            {tourItinerary.map((item, index) => {
              return (
                <div key={index}>
                  <div className="sektion md:grid-cols-4 my-10">
                    {/* right side........................ .................. ..........  */}
                    <div className="col-span-3 space-y-5">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={item.title}
                          onChange={(event) => {
                            handleItineraryChange(event, index);
                          }}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-3"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          onChange={(event) => {
                            handleItineraryChange(event, index);
                          }}
                          name="description"
                          value={item.description}
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>

                      <div className="sektion2 md:grid-cols-2">
                        <div className="space-y-1">
                          <label htmlFor="destnopitons">Destination</label>

                          {destinations.length > 0 && (
                            <select
                              id="destnopitons"
                              className="inputClass"
                              value={item.destinationId}
                              name="destinationId"
                              onChange={(event) =>
                                handleItineraryChange(event, index)
                              }
                            >
                              <option value=""> Select Destination </option>
                              {destinations.map((dstn, dstnIndex) => (
                                <option key={dstnIndex} value={dstn.id}>
                                  {dstn.name}
                                </option>
                              ))}
                            </select>
                          )}

                          {item.destinationId != "" && (
                            <div className="w-full space-y-2 pt-1 md:flex gap-2">
                              {getDstnImages(item.destinationId)
                                .slice(0, 3)
                                .map((img, index) => (
                                  <div key={index} className="w-[33%] my-2">
                                    <img
                                      className="w-full h-auto rounded-md"
                                      src={img}
                                      alt={`dstn image ${index}`}
                                    />
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                        {item.destinationId != "" && (
                          <div className="space-y-1">
                            <label htmlFor="accommodations">
                              accommodation
                            </label>

                            {accommodations.length > 0 && (
                              <select
                                id="accommodations"
                                className="inputClass"
                                value={item.accommodationId}
                                name="accommodationId"
                                onChange={(event) =>
                                  handleItineraryChange(event, index)
                                }
                              >
                                <option value=""> Select Accommodation </option>
                                {accommodations
                                  .filter(
                                    (accm) =>
                                      accm.destinationId == item.destinationId
                                  )
                                  .map((accm, accmIndex) => (
                                    <option key={accmIndex} value={accm.id}>
                                      {accm.name}
                                    </option>
                                  ))}
                              </select>
                            )}
                            {/* accommodation images.............................. */}
                            {item.accommodationId != "" && (
                              <div className="w-full space-y-2 pt-1 md:flex gap-2">
                                {getAccommodationImages(item.accommodationId)
                                  .slice(0, 3)
                                  .map((img, index) => (
                                    <div key={index} className="w-[33%] my-2">
                                      <img
                                        className="w-full h-auto rounded-md"
                                        src={img}
                                        alt={`accommodation image ${index}`}
                                      />
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 ">
                        <ImagesUploadSection
                          imgs={initialData ? item.photos : null}
                          sectionTitle="Highlight Images"
                          removeImageToList={(imgUrl) =>
                            handleDeleteIPhoto(index, imgUrl)
                          }
                          addImageToList={(imgUrl) =>
                            handleAddIPhoto(index, imgUrl)
                          }
                          uploadFolderName="itinerary-images"
                          cropRatio={2 / 1}
                        />
                      </div>
                    </div>

                    {/* left side */}
                    <div className="flex items-center justify-center">
                      <button
                        style={{ cursor: "pointer" }}
                        className="hover:bg-red-300 p-2 rounded-md "
                        onClick={() => handleDeleteItineraryItem(index)}
                      >
                        <FaTrash className="text-red-700" />{" "}
                      </button>
                    </div>
                  </div>
                  <hr className="my-1" />
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleAddItineraryItem}
          className="bg-protertiary text-procolor hover:bg-proprimary hover:text-white rounded p-2"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ItinerarySection;
