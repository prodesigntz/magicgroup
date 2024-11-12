import {
  FaFacebook,
  FaInstagram,
  FaTripadvisor,
  FaSafari,
  FaWeight,
  FaSwimmingPool,
} from "react-icons/fa"; // Import specific FontAwesome icons
import { FaWifi } from "react-icons/fa6";
import { MdFoodBank } from "react-icons/md";

export const iconOptions = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Trip Advisor", value: "tripadvisor" },
  { label: "Safari Booking", value: "safari" },
  { label: "Wifi", value: "wifi" },
  { label: "Swimming Pool", value: "swimming" },
  { label: "Gym", value: "gym" },
  { label: "Dining", value: "food" },
];

export const renderIcon = (iconName) => {
  switch (iconName) {
    case "facebook":
      return <FaFacebook />;
    case "instagram":
      return <FaInstagram />;
    case "tripadvisor":
      return <FaTripadvisor />;
    case "safari":
      return <FaSafari />;
    case "wifi":
      return <FaWifi />;
    case "swimming":
      return <FaSwimmingPool />;
    case "gym":
      return <FaWeight />;
    case "food":
      return <MdFoodBank />;
    default:
      return null;
  }
};
