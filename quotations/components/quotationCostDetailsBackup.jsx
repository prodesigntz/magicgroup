import ControlledSwitch from "@/components/dashboard/controlledSwitchItem";
import DashboardRangeSlider from "@/components/dashboard/dashboardRangeSlider";
import SectionDivider from "@/components/simpleComponents/section-divider";
import SingleItemSelectionInput from "@/components/singleItemSelectionInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";
import useFetchMultipleDocsByFieldNames from "@/lib/hooks/useFetchMultipleDocsByFieldNames";
import { changeToCurrency, isValidNumber } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";

const QuotationCostDetails = ({
  itinerary,
  onPriceUpdate,
  kidsNumber,
  adultsNumber,
}) => {
  const newCarItem = {
    carId: "",
    daysNumber: itinerary.length,
    crewSize: 1,
    description: "",
  };

  const { fetchedAccommodations, fetchedDestinations, fetchedDayTrips } =
    useAppContext();

  const findDst = (dstnId) => {
    const dst = fetchedDestinations.find((item) => item.id === dstnId);
    return dst;
  };

  const findAccm = (accmId) => {
    const acm = fetchedAccommodations.find((item) => item.id === accmId);
    return acm;
  };

  //all vehicles..................................
  const { data: allVehicles, isLoading } = useFetchMultipleDocsByFieldNames(
    "vehicles",
    [{ fieldName: "isPublished", value: true }],
    {
      fieldName: "createdAt",
      value: "desc",
    }
  );

  //populating itinerary if available............
  useEffect(() => {
    if (itinerary.length > 0) {
      setValues((prevState) => ({ ...prevState, itinerary }));
    }
  }, [itinerary]);

  const initialData = {
    price: {
      foreigner: {
        youth: { highSeason: 0, lowSeason: 0 },
        adult: { highSeason: 0, lowSeason: 0 },
      },
      local: {
        youth: { highSeason: 0, lowSeason: 0 },
        adult: { highSeason: 0, lowSeason: 0 },
      },
    },
    itinerary: [],
    transport: [newCarItem],
  };

  const [values, setValues] = useState(initialData);
  const [tourProfit, setTourProfit] = useState(0);

  //itinerary costs section..................................................................................................................
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedCostItemIndex, setSelectedCostItemIndex] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(true);

  const [isCostDetailsVisible, setIsCostDetailsVisible] = useState(false);

  //handle change custom field........... .............................................
  const handleChangeCustomField = (event, itemIndex) => {
    const { name, value } = event.target;
    if (name === "customValue") {
      if (!isValidNumber(value) && value.length > 0) return;
    }
    setValues((prevState) => {
      const updatedData = prevState.itinerary.map((item, index) => {
        if (itemIndex === index) {
          return { ...item, [name]: value };
        }
        return item;
      });
      return { ...prevState, itinerary: updatedData };
    });
  };

  //handle add custom cost field.............................................. .........
  const handleSubmitCustomCostfield = (itemIndex) => {
    const itm = values.itinerary[itemIndex];
    if (itm.customTitle == "" || itm.customValue == "") {
      window.alert("complete the form before submitting");
      return;
    } else {
      //adding data to costs data........... ........... ........... ... .........................
      setValues((prevState) => {
        // const updatedData = getUpdatedItn(prevState);
        const newItn = prevState.itinerary.map((item, index) => {
          if (itemIndex === index) {
            if (!isAddingItem && itemIndex === selectedItemIndex) {
              //is editting item.... ...... ........... ............. ........... ....... .........
              const updatedCosts = item.costs.map((costItem, costindx) => {
                if (costindx === selectedCostItemIndex) {
                  return { title: item.customTitle, value: item.customValue };
                }
                return costItem;
              });
              return {
                ...item,
                customTitle: "",
                customValue: "",
                costs: updatedCosts,
              };
            } else {
              return {
                ...item,
                customTitle: "",
                customValue: "",
                costs: [
                  ...item.costs,
                  { title: item.customTitle, value: item.customValue },
                ],
              };
            }
          }
          return item;
        });
        return { ...prevState, itinerary: newItn };
      });
    }

    if (!isAddingItem) {
      //reset back to adding item mode ............ ..... ....
      setIsAddingItem(true);
      setSelectedItemIndex(null);
      setSelectedCostItemIndex(null);
    }
  };

  //handle remove custom cost field........... ..........................................
  const handleRemoveCustomCostfield = (itemIndex, customFiedIndex) => {
    setValues((prevState) => {
      const updatedItn = prevState.itinerary.map((item, index) => {
        if (itemIndex === index) {
          const updatedCosts = item.costs.filter(
            (item, costItemIndex) => costItemIndex !== customFiedIndex
          );
          return { ...item, costs: updatedCosts };
        }
        return item;
      });
      return { ...prevState, itinerary: updatedItn };
    });
  };
  //handle change custom field to edit mode..............................................
  const handleEditCustomCostField = (index, indx, costItm) => {
    setValues((prevState) => {
      const updatedItn = prevState.itinerary.map((itnItem, itnItemIndex) => {
        if (index === itnItemIndex) {
          return {
            ...itnItem,
            customTitle: costItm.title,
            customValue: costItm.value,
          };
        }
        return itnItem;
      });
      return { ...prevState, itinerary: updatedItn };
    });

    setSelectedItemIndex(index);
    setSelectedCostItemIndex(indx);
    setIsAddingItem(false);
  };

  const arrayTotal = (arrayItems) => {
    // Convert strings to numbers
    const numbers = arrayItems.map((num) => parseFloat(num));
    const total = numbers.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return total;
  };

  const [isForeigner, setIsForeigner] = useState(true);
  const [isHighSeason, setIsHighSeason] = useState(true);

  const handleChangeToForeigner = () => {
    setIsForeigner(true);
  };

  const handleChangeToLocal = () => {
    setIsForeigner(false);
  };

  const handleChangeToHSeason = () => {
    setIsHighSeason(true);
  };

  const handleChangeToLSeason = () => {
    setIsHighSeason(false);
  };

  const getAccmRate = (item) => {
    let amount = 0;
    const appliedRates = item.accommodation.appliedRates;
    const selectedRoom =
      item.accommodation.costs.roomsCostDetails[appliedRates.roomIndex];

    if (isForeigner) {
      //for foreigner..................................................................
      if (isHighSeason) {
        amount = appliedRates.isSto
          ? selectedRoom.foreigner.highSeason.sto
          : selectedRoom.foreigner.highSeason.rack;
      } else {
        amount = appliedRates.isSto
          ? selectedRoom.foreigner.lowSeason.sto
          : selectedRoom.foreigner.lowSeason.rack;
      }
    } else {
      //for local customer..............................................................

      if (isHighSeason) {
        amount = appliedRates.isSto
          ? selectedRoom.local.highSeason.sto
          : selectedRoom.local.highSeason.rack;
      } else {
        amount = appliedRates.isSto
          ? selectedRoom.local.lowSeason.sto
          : selectedRoom.local.lowSeason.rack;
      }
    }

    return amount;
  };

  const handleChangeAccmRatesApplied = (itemIndex, roomIndex, isSto) => {
    setValues((prevState) => {
      const updatedItinerary = prevState.itinerary.map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            accommodation: {
              ...item.accommodation,
              appliedRates: { roomIndex: roomIndex, isSto },
            },
          };
        }
        return item;
      });
      return { ...prevState, itinerary: updatedItinerary };
    });
  };

  let totalCosts = 0;
  let totalTransportCost = 0;
  //end of itinerary costs.......................................................................................................................

  //pricing section..............................................................................................................................
  const handleChangePrice = (event) => {
    const { name, value } = event.target;

    console.log("price changed");

    if (!isValidNumber(value) && value !== "") return;

    setValues((prevState) => {
      const prc = prevState.price;
      if (isForeigner) {
        //foreign customer.............
        if (name == "adult") {
          //adult.....................
          if (isHighSeason) {
            //high season.............
            const price = {
              ...prc,
              foreigner: {
                ...prc.foreigner,
                adult: { ...prc.foreigner.adult, highSeason: value },
              },
            };
            return { ...prevState, price };
          } else {
            //low season.............
            const price = {
              ...prc,
              foreigner: {
                ...prc.foreigner,
                adult: { ...prc.foreigner.adult, lowSeason: value },
              },
            };
            return { ...prevState, price };
          }
        } else {
          //youth.....................
          if (isHighSeason) {
            //high season............
            const price = {
              ...prc,
              foreigner: {
                ...prc.foreigner,
                youth: { ...prc.foreigner.youth, highSeason: value },
              },
            };
            return { ...prevState, price };
          } else {
            //low season.............
            const price = {
              ...prc,
              foreigner: {
                ...prc.foreigner,
                youth: { ...prc.foreigner.youth, lowSeason: value },
              },
            };
            return { ...prevState, price };
          }
        }
      } else {
        //local customer...............
        if (name == "adult") {
          //adult.....................
          if (isHighSeason) {
            //high season............
            const price = {
              ...prc,
              local: {
                ...prc.local,
                adult: { ...prc.local.adult, highSeason: value },
              },
            };
            return { ...prevState, price };
          } else {
            //low season.............
            const price = {
              ...prc,
              local: {
                ...prc.local,
                adult: { ...prc.local.adult, lowSeason: value },
              },
            };
            return { ...prevState, price };
          }
        } else {
          //youth.....................
          if (isHighSeason) {
            //high season............
            const price = {
              ...prc,
              local: {
                ...prc.local,
                youth: { ...prc.local.youth, highSeason: value },
              },
            };
            return { ...prevState, price };
          } else {
            //low season.............
            const price = {
              ...prc,
              local: {
                ...prc.local,
                youth: { ...prc.local.youth, lowSeason: value },
              },
            };
            return { ...prevState, price };
          }
        }
      }
    });
  };

  const getPrice = (isAdult, isHSeason) => {
    let value = 0;
    if (isForeigner) {
      if (isAdult) {
        //adult..........
        if (isHSeason) {
          //its for high season........
          value = values.price.foreigner.adult.highSeason;
        } else {
          //its for low season.........
          value = values.price.foreigner.adult.lowSeason;
        }
      } else {
        //youth...........

        if (isHSeason) {
          //its for high season........
          value = values.price.foreigner.youth.highSeason;
        } else {
          //its for low season.........
          value = values.price.foreigner.youth.lowSeason;
        }
      }
    } else {
      //local customer...................................
      if (isAdult) {
        //adult..........
        if (isHSeason) {
          //its for high season........
          value = values.price.local.adult.highSeason;
        } else {
          //its for low season.........
          value = values.price.local.adult.lowSeason;
        }
      } else {
        //youth...........

        if (isHSeason) {
          //its for high season........
          value = values.price.local.youth.highSeason;
        } else {
          //its for low season.........................................
          value = values.price.local.youth.lowSeason;
        }
      }
    }
    return value;
  };

  //pricing by profit percentage.......................................
  const handlePricePercentageChange = (selectedPercent) => {
    let adultCost = (100 * totalCosts) / (100 - selectedPercent);
    adultCost = Number(adultCost.toFixed(0));
    const youthCost = Math.round(adultCost / 2);
    const tProfit = Math.round(adultCost - totalCosts);

    setTourProfit((prevState) => {
      if (tProfit == 1) {
        return 0;
      }
      return tProfit;
    });

    let tourPrice = {
      foreigner: {
        youth: { highSeason: youthCost, lowSeason: youthCost },
        adult: { highSeason: adultCost, lowSeason: adultCost },
      },
      local: {
        youth: { highSeason: youthCost, lowSeason: youthCost },
        adult: { highSeason: adultCost, lowSeason: adultCost },
      },
    };

    setValues((prevState) => ({ ...prevState, price: tourPrice }));
  };
  //end of pricing section.......................................................................................................................

  //transport section...............................................
  const handleChangeTransportData = (carIndex, fieldName, value) => {
    setValues((prevState) => {
      const updatedCosts = prevState.transport.map((car, index) => {
        if (index === carIndex) {
          return { ...car, [fieldName]: value };
        }
        return car;
      });
      return { ...prevState, transport: updatedCosts };
    });
  };

  const handleAddCar = () => {
    setValues((prevState) => ({
      ...prevState,
      transport: [...prevState.transport, newCarItem],
    }));
  };

  const getTransportCosts = () => {
    let transportCost = 0;

    if (values.transport.length > 0) {
      values.transport.forEach((vehicle) => {
        const car = allVehicles.find((vh) => vh.id === vehicle.carId);
        if (car) {
          if (car.rentingPrice) {
            transportCost += Number(car.rentingPrice);
          }
          if (car.driverPrice) {
            transportCost += Number(car.driverPrice);
          }
          if (car.fuelPrice) {
            transportCost += Number(car.fuelPrice);
          }
        }
      });
    }

    return transportCost;
  };

  const getTotalCarCost = (carId) => {
    let cost = 0;

    const car = allVehicles.find((vh) => vh.id === carId);

    if (car) {
      if (car.rentingPrice) {
        cost += Number(car.rentingPrice);
      }
      if (car.driverPrice) {
        cost += Number(car.driverPrice);
      }
      if (car.fuelPrice) {
        cost += Number(car.fuelPrice);
      }
    }

    return cost;
  };

  //total tour cost .................................................

  const getAdultPrice = () => {
    let value = 0;
    if (isForeigner) {
      //adult..........
      if (isHighSeason) {
        //its for high season........
        value = values.price.foreigner.adult.highSeason;
      } else {
        //its for low season.........
        value = values.price.foreigner.adult.lowSeason;
      }
    } else {
      //local customer...................................

      //adult..........
      if (isHighSeason) {
        //its for high season........
        value = values.price.local.adult.highSeason;
      } else {
        //its for low season.........
        value = values.price.local.adult.lowSeason;
      }
    }

    return Number(value);
  };

  const getTotalTourCost = () => {
    if (adultsNumber === 0 && kidsNumber === 0) return 0;

    //adults total cost.....
    const adultsTotalCost = getAdultPrice() * adultsNumber;
    const kidsTotalCost = (getAdultPrice() / 2) * kidsNumber;

    return adultsTotalCost + kidsTotalCost;
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-3 gap-3">
        {" "}
        {[1, 2, 3].map((itm, index) => (
          <Skeleton className="w-full h-24" key={index} />
        ))}{" "}
      </div>
    );

  return (
    <>
      {/* cost details section.................................................................................................................................... */}
      {values.itinerary.length > 0 && (
        <div>
          {/*transport details..................................................... */}
          <h2 className="text-xl font-semibold my-6 text-gray-800">
            Transport Details
          </h2>

          {/* is there any vehicles.......................... */}
          {allVehicles.length > 0 ? (
            <>
              {values.transport.map((car, carIndex) => (
                <div key={carIndex}>
                  <div className=" grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <SingleItemSelectionInput
                        label="Select Car"
                        labelClasses="block font-semibold"
                        handleItemChange={(value) =>
                          handleChangeTransportData(carIndex, "carId", value)
                        }
                        options={allVehicles.map((itm, indx) => ({
                          id: indx,
                          label: itm.carType,
                          value: itm.id,
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold">
                        Number Of Days
                      </label>
                      <input
                        type="text"
                        className="w-full  p-2 border border-gray-300 rounded"
                        name="daysNumber"
                        value={car.daysNumber}
                        onChange={(e) => {
                          if (
                            !isValidNumber(e.target.value) &&
                            e.target.value !== ""
                          )
                            return;

                          if (
                            Number(e.target.value) > values.itinerary.length
                          ) {
                            window.alert(
                              "You cannot assign a number greater than number of days of an itinerary"
                            );
                            return;
                          }

                          handleChangeTransportData(
                            carIndex,
                            "daysNumber",
                            e.target.value
                          );
                        }}
                        required
                      />
                    </div>

                    <div className=" md:col-span-2">
                      <label className="block font-semibold">Description</label>
                      <textarea
                        id="description"
                        value={car.description}
                        onChange={(e) =>
                          handleChangeTransportData(
                            carIndex,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="eg. used on day 1,2,3,4,5 etc."
                        rows="1"
                      ></textarea>
                    </div>
                  </div>

                  <hr className="mb-2" />
                </div>
              ))}{" "}
            </>
          ) : (
            <div className="text-center">
              {" "}
              <p className="text-lg font-semibold">
                No any car was found...
              </p>{" "}
            </div>
          )}

          <div className="block">
            <button
              onClick={handleAddCar}
              className="bg-protertiary text-procolor mb-3 hover:bg-proprimary hover:text-white rounded p-2"
            >
              <FaPlus />
            </button>
          </div>

          {/* end of transport details..................................................... */}
          <div className="flex  justify-between items-center mt-10">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Itinerary Cost Details
            </h2>

            <ControlledSwitch
              title=""
              isChecked={isCostDetailsVisible}
              onChange={() => {
                setIsCostDetailsVisible(!isCostDetailsVisible);
              }}
            />
          </div>
          <div className={`${isCostDetailsVisible ? "block" : "hidden"}`}>
            {/* cost details .................................................................................... */}
            <div className=" mt-6">
              <div className="flex items-center gap-10">
                <div className="flex gap-2 rounded-lg bg-[#f1f5f9]">
                  <button
                    type="button"
                    onClick={handleChangeToForeigner}
                    className={`${
                      isForeigner ? "bg-prosecondary" : "text-gray-600"
                    } px-3 py-2 rounded-lg  text-[17px]`}
                  >
                    Foreigner
                  </button>
                  <button
                    type="button"
                    onClick={handleChangeToLocal}
                    className={` ${
                      isForeigner ? " text-gray-600" : " bg-prosecondary"
                    } px-3 py-2 rounded-lg  text-[17px]`}
                  >
                    Local
                  </button>
                </div>

                <div className="flex gap-2 rounded-lg bg-[#f1f5f9]">
                  <button
                    type="button"
                    onClick={handleChangeToHSeason}
                    className={`${
                      isHighSeason ? "bg-prosecondary" : "text-gray-600"
                    } px-3 py-2 rounded-lg  text-[17px]`}
                  >
                    High Season
                  </button>
                  <button
                    type="button"
                    onClick={handleChangeToLSeason}
                    className={` ${
                      isHighSeason ? " text-gray-600" : " bg-prosecondary"
                    } px-3 py-2 rounded-lg  text-[17px]`}
                  >
                    Low Season
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2">
              {values.itinerary.map((item, index) => {
                //destination costs.......................
                const { carPermit, consessionFee, parkFee, crewFee } =
                  item.destination
                    ? item.destination.costs
                    : {
                        carPermit: 0,
                        consessionFee: 0,
                        parkFee: 0,
                        crewFee: 0,
                      };

                const additionalCosts = item.destination
                  ? item.destination.additionalCosts.map((item) => item.amount)
                  : [];

                const carPermitTotal = carPermit * values.transport.length;
                const crewFeeTotal = crewFee * Number(item.crewSize);
                const parkFeeTotal =
                  parkFee * (Number(kidsNumber) + Number(adultsNumber));
                const consessionFeeTotal =
                  item.accommodation && item.accommodation.isInPark
                    ? consessionFee *
                      (Number(kidsNumber) + Number(adultsNumber))
                    : 0;

                const dstnTotal = arrayTotal([
                  ...additionalCosts,
                  carPermitTotal,
                  consessionFeeTotal,
                  parkFeeTotal,
                  crewFeeTotal,
                ]);

                const dstnTotalFormatted = changeToCurrency(dstnTotal);

                //accommodation costs................................. ............ ....... ................
                const appliedRates = item.accommodation
                  ? item.accommodation.appliedRates
                  : "no rates for accommodation";

                const accmTotal = item.accommodation ? getAccmRate(item) : 0;
                const accmRate = Number(accmTotal);
                const accmRateFormatted = changeToCurrency(accmRate);
                //other costs ............... ...................................................... .......
                const otherCostsAmounts = item.costs.map(
                  (costItem) => costItem.value
                );
                const otherCostsTotal = arrayTotal(otherCostsAmounts);

                const otherCostsTotalFormatted =
                  changeToCurrency(otherCostsTotal);

                const generalAmount = otherCostsTotal + accmRate + dstnTotal;
                const generalAmountFormatted = changeToCurrency(generalAmount);

                totalCosts += generalAmount + getTransportCosts();
                return (
                  <div key={index}>
                    <SectionDivider />

                    <p className="my-4 font-bold text-lg italic text-procolor">
                      Day {1 + index}
                    </p>
                    <div className="grid gap-3 md:grid-cols-3 mt-3">
                      {/* destination realted costs.................................................................................................. */}
                      {item.destination && (
                        <div>
                          <h2 className="block mb-2 text-lg text-gray-700 font-bold">
                            Destination related costs
                          </h2>
                          <p className="my-1"> {item.destination.name} </p>

                          <table className=" bg-white border border-gray-200 md:w-2/3">
                            <thead className="bg-gray-200">
                              <tr>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                                  TITLE
                                </th>
                                <th className="px-6 py-3 border-b text-right text-sm font-medium text-gray-500">
                                  AMOUNT
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.accommodation &&
                                item.accommodation.isInPark && (
                                  <tr>
                                    <td className="px-6 py-2 border-b text-sm text-gray-900">
                                      Consession Fee: <br /> (${consessionFee} x{" "}
                                      {Number(kidsNumber) +
                                        Number(adultsNumber)}{" "}
                                      guests )
                                    </td>
                                    <td className="px-6 py-2 border-b text-sm text-right text-gray-900">
                                      {changeToCurrency(
                                        consessionFee *
                                          (Number(kidsNumber) +
                                            Number(adultsNumber))
                                      )}
                                    </td>
                                  </tr>
                                )}

                              <tr>
                                <td className="px-6 py-2 border-b text-sm text-gray-900">
                                  Car Permit Fee: <br /> (${carPermit} x{" "}
                                  {values.transport.length}{" "}
                                  {values.transport.length === 1
                                    ? "car"
                                    : "cars"}
                                  )
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-right text-gray-900">
                                  {changeToCurrency(
                                    carPermit * values.transport.length
                                  )}
                                </td>
                              </tr>

                              <tr>
                                <td className="px-6 py-2 border-b text-sm text-gray-900">
                                  Crew Fee: <br /> (${crewFee} x{" "}
                                  {Number(item.crewSize)})
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-right text-gray-900">
                                  {changeToCurrency(
                                    crewFee * Number(item.crewSize)
                                  )}
                                </td>
                              </tr>

                              <tr>
                                <td className="px-6 py-2 border-b text-sm text-gray-900">
                                  Park Fee: <br /> (${parkFee} x{" "}
                                  {Number(kidsNumber) + Number(adultsNumber)}{" "}
                                  guests)
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-right text-gray-900">
                                  {changeToCurrency(
                                    parkFee *
                                      (Number(kidsNumber) +
                                        Number(adultsNumber))
                                  )}
                                </td>
                              </tr>

                              {item.destination.additionalCosts.length > 0 && (
                                <>
                                  {item.destination.additionalCosts.map(
                                    (itm, indxx) => (
                                      <tr key={indxx}>
                                        <td className="px-6 py-2 border-b text-sm text-gray-900">
                                          {itm.title}:
                                        </td>
                                        <td className="px-6 py-2 border-b text-sm text-right text-gray-900">
                                          ${itm.amount}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </>
                              )}
                              <tr>
                                <td className="px-6 py-2 border-b text-sm text-gray-900 font-semibold">
                                  Total
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-right text-gray-900 font-semibold">
                                  {dstnTotalFormatted}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      {/* accommodation realted costs.................................................................................................. */}
                      {item.accommodation && (
                        <div>
                          <h2 className="block mb-2 text-lg text-gray-700 font-bold">
                            Accommodation related costs
                          </h2>
                          <p className="my-1 capitalize">
                            {item.accommodation.name}
                          </p>

                          <table className="bg-white border border-gray-200 ">
                            <thead className="bg-gray-200">
                              <tr>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                                  ROOM TYPE
                                </th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                                  STO
                                </th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                                  RAC
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.accommodation.costs.roomsCostDetails.map(
                                (rItem, rIndex) => {
                                  if (isForeigner) {
                                    //foreigner...............................
                                    if (isHighSeason) {
                                      return (
                                        <tr key={rIndex}>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            {
                                              rItem.foreigner.highSeason
                                                .roomType
                                            }
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={` ${
                                                appliedRates.roomIndex ===
                                                  rIndex && appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  true
                                                )
                                              }
                                            >
                                              ${rItem.foreigner.highSeason.sto}
                                            </button>
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={`${
                                                appliedRates.roomIndex ===
                                                  rIndex && !appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  false
                                                )
                                              }
                                            >
                                              ${rItem.foreigner.highSeason.rack}
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    } else {
                                      //foreigner low season

                                      return (
                                        <tr key={rIndex}>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            {rItem.foreigner.lowSeason.roomType}
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={` ${
                                                appliedRates.roomIndex ===
                                                  rIndex && appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  true
                                                )
                                              }
                                            >
                                              ${rItem.foreigner.lowSeason.sto}
                                            </button>
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={`${
                                                appliedRates.roomIndex ===
                                                  rIndex && !appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  false
                                                )
                                              }
                                            >
                                              ${rItem.foreigner.lowSeason.rack}
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  } else {
                                    //local...............................
                                    if (isHighSeason) {
                                      return (
                                        <tr key={rIndex}>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            {rItem.local.highSeason.roomType}
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={` ${
                                                appliedRates.roomIndex ===
                                                  rIndex && appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  true
                                                )
                                              }
                                            >
                                              ${rItem.local.highSeason.sto}
                                            </button>
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={`${
                                                appliedRates.roomIndex ===
                                                  rIndex && !appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  false
                                                )
                                              }
                                            >
                                              ${rItem.local.highSeason.rack}
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    } else {
                                      //local low season

                                      return (
                                        <tr key={rIndex}>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            {rItem.local.lowSeason.roomType}
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={` ${
                                                appliedRates.roomIndex ===
                                                  rIndex && appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  true
                                                )
                                              }
                                            >
                                              ${rItem.local.lowSeason.sto}
                                            </button>
                                          </td>
                                          <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                            <button
                                              className={`${
                                                appliedRates.roomIndex ===
                                                  rIndex && !appliedRates.isSto
                                                  ? "bg-prosecondary"
                                                  : "transparent"
                                              }   cursor-pointer px-2 py-1 rounded`}
                                              onClick={() =>
                                                handleChangeAccmRatesApplied(
                                                  index,
                                                  rIndex,
                                                  false
                                                )
                                              }
                                            >
                                              ${rItem.local.lowSeason.rack}
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  }
                                }
                              )}
                              <tr>
                                <td className="px-6 py-2 border-b text-sm text-gray-900 font-semibold">
                                  &nbsp;
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-gray-900 font-semibold">
                                  Total
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-right text-gray-900 font-semibold">
                                  {accmRateFormatted}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div>
                        {/* other costs......................................................................................................... */}
                        <h2 className="block mb-2 text-lg text-gray-700 font-bold">
                          Other costs
                        </h2>
                        {/* custom fields form................................................... */}
                        <div className=" mb-3">
                          <div className="flex justify-center items-center gap-2 mt-1 ">
                            <div className="col-span-5">
                              <input
                                type="text"
                                name="customTitle"
                                value={item.customTitle}
                                onChange={(event) =>
                                  handleChangeCustomField(event, index)
                                }
                                placeholder="Title"
                                className="inputClass"
                              />
                            </div>

                            <div className="col-span-5">
                              <input
                                type="text"
                                name="customValue"
                                placeholder="amount"
                                value={item.customValue}
                                onChange={(event) =>
                                  handleChangeCustomField(event, index)
                                }
                                className="inputClass"
                              />
                            </div>
                            <div className="flex-grow">
                              <button
                                style={{ cursor: "pointer" }}
                                className="bg-protertiary text-procolor hover:bg-proprimary hover:text-white rounded-md p-3 "
                                onClick={() =>
                                  handleSubmitCustomCostfield(index)
                                }
                              >
                                <IoMdSend className="text-lg" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* end of custom fields section....................................  */}
                        {item.costs.length > 0 && (
                          <table className="bg-white border border-gray-200 w-full">
                            <thead className="bg-gray-200">
                              <tr>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                                  Title
                                </th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                                  Amount
                                </th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                                  &nbsp;
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.costs.map((costItm, indx) => (
                                <tr key={indx}>
                                  <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                    {costItm.title}
                                  </td>
                                  <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                    ${costItm.value}
                                  </td>
                                  <td className="px-6 py-2 border-b text-sm text-left text-gray-900">
                                    <div className="flex items-center gap-2">
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className=" text-orange-500 hover:bg-orange-100 rounded-md py-1 px-3"
                                        onClick={() =>
                                          handleEditCustomCostField(
                                            index,
                                            indx,
                                            costItm
                                          )
                                        }
                                      >
                                        <FaEdit />
                                      </button>
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className=" text-red-700 hover:bg-red-200 rounded-md py-1 px-3"
                                        onClick={() =>
                                          handleRemoveCustomCostfield(
                                            index,
                                            indx
                                          )
                                        }
                                      >
                                        <FaTrash />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td className="px-6 py-2 border-b text-sm text-gray-900 font-semibold">
                                  Total
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-left text-gray-900 font-semibold">
                                  {otherCostsTotalFormatted}
                                </td>
                                <td className="px-6 py-2 border-b text-sm text-gray-900 font-semibold">
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>

                    <div className=" border-b-2 border-proprimary inline-block mt-6 ">
                      <p className=" capitalize text-proprimary  text-lg font-bold">
                        Total cost: {generalAmountFormatted}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <SectionDivider />
            {values.transport.length > 0 && (
              <div className="mt-14">
                <p className=" capitalize text-lg font-bold mb-4">
                  Transport Costs
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {values.transport.map((itm, carIndex) => {
                    const car = allVehicles.find((vh) => vh.id === itm.carId);
                    const totalCarCost =
                      getTotalCarCost(itm.carId) * Number(itm.daysNumber);
                    totalTransportCost += totalCarCost;
                    return (
                      <div
                        key={carIndex}
                        className="p-4 shadow rounded-md mt-4 border border-gray-200 "
                      >
                        <p className="  uppercase font-semibold  mb-4">
                          Car type: {car?.carType}
                        </p>
                        <p className="    mb-4">
                          Car renting cost / day: ${car?.rentingPrice}
                        </p>

                        {car && isValidNumber(car.driverPrice) && (
                          <p className="   mb-4">
                            {" "}
                            Driver cost / day :${car?.driverPrice}
                          </p>
                        )}

                        {car && isValidNumber(car.fuelPrice) && (
                          <p className="   mb-4">
                            {" "}
                            Car fuel cost / day :${car?.fuelPrice}
                          </p>
                        )}

                        <p className="   mb-4">
                          {" "}
                          Total cost / day : ${getTotalCarCost(itm.carId)}
                        </p>

                        {itm.daysNumber > 0 ? (
                          <p className=" capitalize text-gray-600 font-semibold  mb-4">
                            {" "}
                            Total cost for {itm.daysNumber}{" "}
                            {`${itm.daysNumber > 1 ? "days" : "day"}`} : $
                            {totalCarCost}
                          </p>
                        ) : (
                          <p className="text-red-400 font-semibold">
                            {" "}
                            Number of days no assigned
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className=" border-b-2 border-proprimary inline-block mt-6 ">
                  <p className=" capitalize text-proprimary  text-lg font-bold">
                    Total cost: {changeToCurrency(totalTransportCost)}
                  </p>
                </div>
              </div>
            )}
          </div>
          <SectionDivider />

          <div className="mt-14">
            <p className=" capitalize text-xl font-bold mb-4">
              Total itinerary cost
            </p>
            <div className="btn py-2 px-6   rounded-xl capitalize bg-proprimary text-white text-lg inline">
              {changeToCurrency(totalCosts)}
            </div>
          </div>
          <SectionDivider />
        </div>
      )}
      {/* end of cost details  section............................................................... */}

      {/* price settings section..................................... ............... ....... ............ */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Tour Price (per person)
        </h2>
        <div className=" mt-6">
          <div className="flex items-center gap-10">
            <div className="flex gap-2 rounded-lg bg-[#f1f5f9]">
              <button
                type="button"
                onClick={handleChangeToForeigner}
                className={`${
                  isForeigner ? "bg-prosecondary" : "text-gray-600"
                } px-3 py-2 rounded-lg  text-[17px]`}
              >
                Foreigner
              </button>
              <button
                type="button"
                onClick={handleChangeToLocal}
                className={` ${
                  isForeigner ? " text-gray-600" : " bg-prosecondary"
                } px-3 py-2 rounded-lg  text-[17px]`}
              >
                Local
              </button>
            </div>
            <div className="flex gap-2 rounded-lg bg-[#f1f5f9]">
              <button
                type="button"
                onClick={handleChangeToHSeason}
                className={`${
                  isHighSeason ? "bg-prosecondary" : "text-gray-600"
                } px-3 py-2 rounded-lg  text-[17px]`}
              >
                High Season
              </button>
              <button
                type="button"
                onClick={handleChangeToLSeason}
                className={` ${
                  isHighSeason ? " text-gray-600" : " bg-prosecondary"
                } px-3 py-2 rounded-lg  text-[17px]`}
              >
                Low Season
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 md:grid md:grid-cols-2 gap-6  pt-6">
          <div>
            <label htmlFor="dayN" className="text-lg">
              Adult Price{" "}
            </label>

            {!isHighSeason && (
              <div className="my-3">
                <input
                  type="text"
                  name="adult"
                  value={getPrice(true, false)}
                  onChange={handleChangePrice}
                  placeholder="Low season"
                  required
                  className=" inputClass"
                />
              </div>
            )}

            {isHighSeason && (
              <div className="my-3">
                <input
                  type="text"
                  name="adult"
                  value={getPrice(true, true)}
                  onChange={handleChangePrice}
                  placeholder="High season"
                  required
                  className=" inputClass"
                />
              </div>
            )}
          </div>

          {/* <div>
            <label htmlFor="youthN" className="text-lg">
              Youth Price{" "}
            </label>
            {!isHighSeason && (
              <div className="my-3">
                <input
                  type="text"
                  id="youthN"
                  name="youth"
                  value={getPrice(false, false)}
                  onChange={handleChangePrice}
                  required
                  className=" inputClass"
                  placeholder="Low season"
                />
              </div>
            )}

            {isHighSeason && (
              <div className="my-3">
                <input
                  type="text"
                  name="youth"
                  value={getPrice(false, true)}
                  onChange={handleChangePrice}
                  required
                  className=" inputClass"
                  placeholder="High season"
                />
              </div>
            )}
          </div> */}
        </div>
      </div>
      <div className="my-3">
        <DashboardRangeSlider
          title="Profit Percentage"
          max={100}
          min={0}
          profit={tourProfit}
          handleChangeValue={handlePricePercentageChange}
        />
      </div>

      <SectionDivider />
      <div>
        <div className="mb-5">
          <p className=" uppercase text-lg font-bold my-4 ">
            Total cost of tour
          </p>
          <p className="mb-3">
            Adult price({changeToCurrency(getAdultPrice())}) x number of adults
            ({adultsNumber}) ={" "}
            <span className="font-semibold">
              {" "}
              {changeToCurrency(getAdultPrice() * adultsNumber)}
            </span>{" "}
          </p>
          <p className="mb-3">
            Child price({changeToCurrency(getAdultPrice() / 2)}) x number of
            children ({kidsNumber}) ={" "}
            <span className="font-semibold">
              {" "}
              {changeToCurrency((getAdultPrice() / 2) * kidsNumber)}
            </span>{" "}
          </p>

          <p className="mb-3">
            Total cost (without VAT) {changeToCurrency(getTotalTourCost())}
          </p>
          <p className="mb-3">VAT = 18%</p>
        </div>

        <div className="btn py-2 px-6   rounded-xl capitalize bg-procolor text-white text-lg inline ">
          {changeToCurrency(getTotalTourCost() * 1.18)}
        </div>
      </div>
      <SectionDivider />

      {/* end of price settings section..................................... ............... ....... ............................................................ */}
    </>
  );
};

export default QuotationCostDetails;
