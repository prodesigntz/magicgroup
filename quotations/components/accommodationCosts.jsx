import { useAppContext } from "@/context/AppContext";
import { changeToCurrency, isValidNumber, localSettings } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import CampSiteCosts from "../../tour-packages/components/campSiteCosts";

const AccommodationCosts = ({
  accommodations,
  isHighSeason,
  code,
  onHandleUpdateAccmCosts,
  onCampingChargesUpdate,
  charges,
  itnItemIndex,
}) => {

  const initialData = accommodations.length > 0 ? accommodations : [];
  const [selectedAccommodations, setSelectedAccommodations] =
    useState(initialData);

  const { fetchedDestinations } = useAppContext();
  // const [accommodationSelected, setAccommodationSelected] = useState(null);

  useEffect(() => {
    if (accommodations.length > 0) {
      const formatedAccms = accommodations.map((item) => {
        if (selectedAccommodations.some((itm) => itm.id === item.id)) {
          const acm = selectedAccommodations.find((itm) => itm.id === item.id);
          return acm;
        }

        return {
          ...item,
          usesSto: true,
        };
      });
      setSelectedAccommodations(formatedAccms);
    }
  }, [accommodations]);

  //updated accommodation costs details in quotation costs component.......
  useEffect(() => {
    onHandleUpdateAccmCosts({ code, cost: calculateTotalCost() });
  }, [selectedAccommodations, isHighSeason, code]);

  // console.log(
  //   "room details",
  //   selectedAccommodations[0].costs.roomsCostDetails
  // );

  const handleRoomSelection = (accmIndex, roomIndex) => {
    // const addedroomFormat = {
    // roomIndex: ,
    // roomType:'',
    // cost:{ hSeason: {sto:0,rack:0}, lSeason: {sto:0,rack:0} };,
    // numberOfCustomers:"",
    // numberOfRooms:"",
    // }

    // let costFormat = { hSeason: {sto:0,rack:0}, lSeason: {sto:0,rack:0} };

    let accm = selectedAccommodations[accmIndex];
    const room = accm.costs.roomsCostDetails[roomIndex];
    if (accm.bookedRooms.some((itm) => itm.roomIndex == roomIndex)) {
      //room already added.... do nothing
      console.log("room already added");
    } else {
      console.log("room not yet added");
      //room not yet added ...add it to booked rooms..............
      setSelectedAccommodations((prevState) => {
        const roomType = room.foreigner.highSeason.roomType;
        const cost = {
          hSeason: {
            sto: room.foreigner.highSeason.sto,
            rack: room.foreigner.highSeason.rack,
          },
          lSeason: {
            sto: room.foreigner.lowSeason.sto,
            rack: room.foreigner.lowSeason.rack,
          },
        };

        const numberOfCustomers = 1;
        const numberOfRooms = 1;
        const newSelectedRoom = {
          roomIndex,
          roomType,
          numberOfCustomers,
          numberOfRooms,
          cost,
        };

        let updatedSelectedAccms = [...prevState];
        updatedSelectedAccms[accmIndex] = {
          ...accm,
          bookedRooms: [...accm.bookedRooms, newSelectedRoom],
        };

        return updatedSelectedAccms;
      });
    }
  };

  const handleChangeNumberOfGuests = (accmIndex, roomIndex, guestsNumber) => {
    console.log("number of guests changes");
    setSelectedAccommodations((prevState) => {
      let updatedSelectedAccms = [...prevState];
      const accm = updatedSelectedAccms[accmIndex];
      const updatedBookedRooms = accm.bookedRooms.map((rm) => {
        if (rm.roomIndex == roomIndex) {
          return { ...rm, numberOfCustomers: guestsNumber };
        }
        return rm;
      });
      updatedSelectedAccms[accmIndex] = {
        ...accm,
        bookedRooms: updatedBookedRooms,
      };

      return updatedSelectedAccms;
    });
  };

  const handleChangeNumberOfRooms = (accmIndex, roomIndex, roomsNumber) => {
    console.log("number of guests changes");
    setSelectedAccommodations((prevState) => {
      let updatedSelectedAccms = [...prevState];
      const accm = updatedSelectedAccms[accmIndex];

      const updatedBookedRooms = accm.bookedRooms.map((rm) => {
        if (rm.roomIndex == roomIndex) {
          return { ...rm, numberOfRooms: roomsNumber };
        }
        return rm;
      });

      updatedSelectedAccms[accmIndex] = {
        ...accm,
        bookedRooms: updatedBookedRooms,
      };
      return updatedSelectedAccms;
    });
  };

  const handleRemoveSelectedRoom = (accmIndex, roomIndex) => {
    setSelectedAccommodations((prevState) => {
      let updatedSelectedAccms = [...prevState];
      const accm = updatedSelectedAccms[accmIndex];

      const updatedBookedRooms = accm.bookedRooms.filter(
        (rm) => rm.roomIndex !== roomIndex
      );

      updatedSelectedAccms[accmIndex] = {
        ...accm,
        bookedRooms: updatedBookedRooms,
      };

      return updatedSelectedAccms;
    });
  };

  const getAccmConcessionFee = (accmIndex) => {
    const accm = selectedAccommodations[accmIndex];
    const dst = fetchedDestinations.find(
      (item) => item.id === accm.destinationId
    );

    const cns = dst.costs.consessionFee ? dst.costs.consessionFee : 0;
    return Number(cns);
  };

  const getAccmGuestNumber = (accmIndex) => {
    const accm = selectedAccommodations[accmIndex];

    let count = 0;
    accm.bookedRooms.forEach((room) => {
      const rmGuests = isValidNumber(room.numberOfCustomers)
        ? room.numberOfCustomers
        : 0;
      count += Number(rmGuests);
    });

    return count;
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    selectedAccommodations.forEach((accm, accIndex) => {
      //rooms cost details...............
      accm.bookedRooms.forEach((room) => {
        const rmsNumber = room.numberOfRooms ? room.numberOfRooms : 0;
        const gstNumber = room.numberOfCustomers ? room.numberOfCustomers : 0;

        let price = 0;

        if (isHighSeason) {
          price = accm.usesSto ? room.cost.hSeason.sto : room.cost.hSeason.rack;
        } else {
          //low season.............
          price = accm.usesSto ? room.cost.lSeason.sto : room.cost.lSeason.rack;
        }

        const totalAmount = accm.costs.roomsCostDetails[room.roomIndex]
          .isPerPerson
          ? price * gstNumber
          : price * rmsNumber;

        totalCost += totalAmount;

        //concession fee...................
      });

      if (accm.isInPark) {
        totalCost +=
          getAccmConcessionFee(accIndex) * getAccmGuestNumber(accIndex);
      }
    });

    return totalCost;
  };

  if (selectedAccommodations.length < 1) return <p>---</p>;

  return (
    <div className="md:px-8">
      <h2 className="block mb-2 text-lg text-gray-700 font-bold">
        Accommodation related costs
      </h2>

      {selectedAccommodations.map((accm, accIndex) => (
        <div className="mb-2" key={accIndex}>
          <p className="my-1 text-gray-700 font-semibold capitalize">
            {accm.name}
          </p>

          {accm.category === localSettings.campSite ? (
            <CampSiteCosts
              charges={charges}
              itnItemIndex={itnItemIndex}
              onCampingChargesUpdate={onCampingChargesUpdate}
            />
          ) : (
            <>
              {" "}
              <div>
                <select
                  id="accm"
                  className="inputClass"
                  onChange={(e) => {
                    if (!e.target.value) return;
                    handleRoomSelection(accIndex, e.target.value);
                  }}
                >
                  {accm.costs ? (
                    <>
                      {" "}
                      <option value="">Select Rooms</option>
                      {accm.costs.roomsCostDetails.map((room, index) => (
                        <option key={index} value={index}>
                          {room.foreigner.highSeason.roomType}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option>no rooms</option>
                  )}
                </select>
              </div>
              {accm.bookedRooms.length > 0 && (
                <div className="">
                  <p className="my-1 capitalize">Selected Rooms</p>
                  <div className="">
                    <div className="w-full grid grid-cols-1 md:grid-cols-5 p-2 bg-protertiary">
                      <div className=" border-r border-r-gray-500 text-center">
                        Type
                      </div>
                      <div className="border-r border-r-gray-500 text-center">
                        Price
                      </div>
                      <div className="border-r border-r-gray-500 text-center">
                        Rooms Taken
                      </div>
                      <div className="border-r border-r-gray-500 text-center">
                        Guests No.
                      </div>
                      <div className="text-center">Cost</div>
                    </div>

                    {accm.bookedRooms.map((room, index) => {
                      if (isHighSeason) {
                        //high season costs.........
                        const price = accm.usesSto
                          ? room.cost.hSeason.sto
                          : room.cost.hSeason.rack;

                        const rmsNumber = room.numberOfRooms
                          ? room.numberOfRooms
                          : 0;
                        const gstNumber = room.numberOfCustomers
                          ? room.numberOfCustomers
                          : 0;

                        const totalAmount = accm.costs.roomsCostDetails[
                          room.roomIndex
                        ].isPerPerson
                          ? price * gstNumber
                          : price * rmsNumber;

                        return (
                          <div key={index}>
                            <div className="w-full grid grid-cols-1 md:grid-cols-5 py-1 px-2">
                              {/* <div className=" border-r border-r-gray-500 text-center"> */}
                              <div className=" text-center">
                                {room.roomType}
                              </div>
                              <div className="text-center">
                                {changeToCurrency(Number(price))} (
                                {accm.costs.roomsCostDetails[room.roomIndex]
                                  .isPerPerson
                                  ? "p/p"
                                  : "p/r"}
                                )
                              </div>
                              <div className="text-center">
                                {" "}
                                <input
                                  type="text"
                                  className="p-1 rounded-md w-10"
                                  value={room.numberOfRooms}
                                  onChange={(e) => {
                                    if (
                                      !isValidNumber(e.target.value) &&
                                      e.target.value !== ""
                                    )
                                      return;

                                    handleChangeNumberOfRooms(
                                      accIndex,
                                      room.roomIndex,
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>

                              <div className="text-center">
                                {" "}
                                <input
                                  type="text"
                                  className="p-1 rounded-md w-10"
                                  value={room.numberOfCustomers}
                                  onChange={(e) => {
                                    if (
                                      !isValidNumber(e.target.value) &&
                                      e.target.value !== ""
                                    )
                                      return;

                                    handleChangeNumberOfGuests(
                                      accIndex,
                                      room.roomIndex,
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>

                              <div className="text-center">
                                {" "}
                                <div className="flex gap-2 items-center justify-center">
                                  <p>{changeToCurrency(totalAmount)}</p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveSelectedRoom(
                                        accIndex,
                                        room.roomIndex
                                      )
                                    }
                                  >
                                    <FaTrash className="text-red-400 rounded-md" />{" "}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <hr />
                          </div>
                        );
                      } else {
                        //low season costs...........
                        const price = accm.usesSto
                          ? room.cost.lSeason.sto
                          : room.cost.lSeason.rack;

                        const rmsNumber = room.numberOfRooms
                          ? room.numberOfRooms
                          : 0;
                        const gstNumber = room.numberOfCustomers
                          ? room.numberOfCustomers
                          : 0;

                        const totalAmount = accm.costs.roomsCostDetails[
                          room.roomIndex
                        ].isPerPerson
                          ? price * gstNumber
                          : price * rmsNumber;

                        return (
                          <div key={index}>
                            <div className="w-full grid grid-cols-1 md:grid-cols-5 py-1 px-2">
                              {/* <div className=" border-r border-r-gray-500 text-center"> */}
                              <div className=" text-center">
                                {room.roomType}
                              </div>
                              <div className="text-center">
                                {" "}
                                {changeToCurrency(Number(price))} (
                                {accm.costs.roomsCostDetails[room.roomIndex]
                                  .isPerPerson
                                  ? "p/p"
                                  : "p/r"}
                                )
                              </div>
                              <div className="text-center">
                                {" "}
                                <input
                                  type="text"
                                  className="p-1 rounded-md w-10"
                                  value={room.numberOfRooms}
                                  onChange={(e) => {
                                    if (
                                      !isValidNumber(e.target.value) &&
                                      e.target.value !== ""
                                    )
                                      return;

                                    handleChangeNumberOfRooms(
                                      accIndex,
                                      room.roomIndex,
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>

                              <div className="text-center">
                                {" "}
                                <input
                                  type="text"
                                  className="p-1 rounded-md w-10"
                                  value={room.numberOfCustomers}
                                  onChange={(e) => {
                                    if (
                                      !isValidNumber(e.target.value) &&
                                      e.target.value !== ""
                                    )
                                      return;

                                    handleChangeNumberOfGuests(
                                      accIndex,
                                      room.roomIndex,
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>

                              <div className="text-center">
                                {" "}
                                <div className="flex gap-2 items-center justify-center">
                                  <p>{changeToCurrency(totalAmount)}</p>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveSelectedRoom(
                                        accIndex,
                                        room.roomIndex
                                      )
                                    }
                                  >
                                    <FaTrash className="text-red-400 rounded-md" />{" "}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <hr />
                          </div>
                        );
                      }
                    })}
                  </div>

                  {accm.isInPark && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-5 py-1 px-2">
                      <div className="md:col-span-4 text-right pr-4">
                        {" "}
                        Concession Fee:{" "}
                        {changeToCurrency(getAccmConcessionFee(accIndex))} x
                        {getAccmGuestNumber(accIndex)}
                      </div>
                      <div className="text-center">
                        {changeToCurrency(
                          getAccmConcessionFee(accIndex) *
                            getAccmGuestNumber(accIndex)
                        )}
                      </div>
                    </div>
                  )}
                  <hr className="mb-4" />

                  {/* <table className="">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                        ROOM TYPE
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                        PRICE (pp)
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500">
                        GUESTS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accm.bookedRooms.map((room, index) => {
                      if (isHighSeason) {
                        //high season costs.........
                        const price = accm.usesSto
                          ? room.cost.hSeason.sto
                          : room.cost.hSeason.rack;
                        return (
                          <tr key={index}>
                            <td className="px-6 py-3 border-b text-left text-sm">
                              {room.roomType}
                            </td>
                            <td className="px-6 py-3 border-b text-left text-sm">
                              {price}
                            </td>
                            <td className="px-6 py-3 border-b text-left text-sm">
                              <div className="flex gap-2 items-center">
                                <div className="">
                                  <input
                                    type="text"
                                    className="px-2 py-2 rounded-md"
                                    value={room.numberOfCustomers}
                                    onChange={(e) => {
                                      if (
                                        !isValidNumber(e.target.value) &&
                                        e.target.value !== ""
                                      )
                                        return;

                                      handleChangeNumberOfGuests(
                                        accIndex,
                                        room.roomIndex,
                                        e.target.value
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveSelectedRoom(
                                        accIndex,
                                        room.roomIndex
                                      )
                                    }
                                  >
                                    <FaTrash className="text-red-400 rounded-md" />{" "}
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      } else {
                        //low season costs...........
                        const price = accm.usesSto
                          ? room.cost.lSeason.sto
                          : room.cost.lSeason.rack;

                        return (
                          <tr key={index}>
                            <td className="px-6 py-3 border-b text-left text-sm">
                              {room.roomType}
                            </td>
                            <td className="px-6 py-3 border-b text-left text-sm">
                              {price}
                            </td>

                            <td className="px-6 py-3 border-b text-left text-sm">
                              <div className="flex gap-2 items-center">
                                <div className="">
                                  <input
                                    type="text"
                                    className="px-2 py-2 rounded-md"
                                    value={room.numberOfCustomers}
                                    onChange={(e) => {
                                      if (
                                        !isValidNumber(e.target.value) &&
                                        e.target.value !== ""
                                      )
                                        return;

                                      handleChangeNumberOfGuests(
                                        accIndex,
                                        room.roomIndex,
                                        e.target.value
                                      );
                                    }}
                                  />
                                </div>
                                <div className="aos">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveSelectedRoom(
                                        accIndex,
                                        room.roomIndex
                                      )
                                    }
                                  >
                                    <FaTrash className="text-red-400 rounded-md" />{" "}
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table> */}
                </div>
              )}{" "}
              <p className="text-lg text-proprimary">
                Total: {changeToCurrency(calculateTotalCost())}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccommodationCosts;

// <select
//   value={selectedValue}
//   onChange={(e) => setSelectedValue(e.target.value)}
// >
//   <option value="option1" onClick={() => handleOptionClick("option1")}>
//     Option 1
//   </option>
//   <option value="option2" onClick={() => handleOptionClick("option2")}>
//     Option 2
//   </option>
//   <option value="option3" onClick={() => handleOptionClick("option3")}>
//     Option 3
//   </option>
// </select>
