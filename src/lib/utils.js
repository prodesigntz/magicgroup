import { clsx } from "clsx"
import slugify from "slugify";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


  export function isNumber(value) {
     return typeof parseInt(value) === "number";
   }

      export function isValidNumber(value) {
        // Convert the value to a number
        const numberValue = Number(value);

        // Check if the value is not an empty string and the converted value is a number and not NaN
        return (
          value.trim() !== "" &&
          typeof numberValue === "number" &&
          !isNaN(numberValue)
        );
      }


export function getSlug(title) {
    const slug = slugify(title, {
      lower: true,
      remove: /[*+~,.()'"!:@]/g,
    });
    return slug;
}

export function truncateDescription  (content, wordLimit) {
    const words = content.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  export function truncateDescriptionNew(desc, wordLimit) {
    const words = desc.split(" ");
    if (words.length <= wordLimit) {
      return desc;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  }


    export function changeToCurrency(amount) {
      const formattedAmount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedAmount;
    }


    export function  stripHtml  (html) {
      return html.replace(/<\/?[^>]+(>|$)/g, ""); 
    };