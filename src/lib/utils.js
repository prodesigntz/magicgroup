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
    const words = desc?.split(" ");
    if (words?.length <= wordLimit) {
      return desc;
    }
    return words?.slice(0, wordLimit).join(" ") + "...";
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

  //  export function serialize(nodes) {
  //    return nodes
  //      .map((node) => {
  //        switch (node.type) {
  //          case "heading-one":
  //            return `<h1>${serialize(node.children)}</h1>`;
  //          case "heading-two":
  //            return `<h2>${serialize(node.children)}</h2>`;
  //          case "heading-three":
  //            return `<h3>${serialize(node.children)}</h3>`;
  //          case "blockquote":
  //            return `<blockquote>${serialize(node.children)}</blockquote>`;
  //          case "numbered-list":
  //            return `<ol>${serialize(node.children)}</ol>`;
  //          case "bulleted-list":
  //            return `<ul>${serialize(node.children)}</ul>`;
  //          case "list-item":
  //            return `<li>${serialize(node.children)}</li>`;
  //          case "link":
  //            return `<a href="${node.url}">${serialize(node.children)}</a>`;
  //          case "paragraph":
  //            return `<p>${serialize(node.children)}</p>`;
  //          default:
  //            return node.text || "";
  //        }
  //      })
  //      .join("");
  //  };

  //  export const serializeToHtml = (nodes) => {
  //    return nodes
  //      .map((node) => {
  //        if (node.text) {
  //          let text = node.text;
  //          if (node.bold) text = `<strong>${text}</strong>`;
  //          if (node.italic) text = `<em>${text}</em>`;
  //          if (node.underline) text = `<u>${text}</u>`;
  //          if (node.strikethrough) text = `<s>${text}</s>`;
  //          return text;
  //        }

  //        const children = node.children
  //          .map((n) => serializeToHtml([n]))
  //          .join("");

  //        switch (node.type) {
  //          case "paragraph":
  //            return `<p>${children}</p>`;
  //          case "heading-one":
  //            return `<h1>${children}</h1>`;
  //          case "heading-two":
  //            return `<h2>${children}</h2>`;
  //          case "heading-three":
  //            return `<h3>${children}</h3>`;
  //          case "blockquote":
  //            return `<blockquote>${children}</blockquote>`;
  //          case "numbered-list":
  //            return `<ol>${children}</ol>`;
  //          case "bulleted-list":
  //            return `<ul>${children}</ul>`;
  //          case "list-item":
  //            return `<li>${children}</li>`;
  //          case "link":
  //            return `<a href="${node.url}">${children}</a>`;
  //          default:
  //            return children;
  //        }
  //      })
  //      .join("");
  //  };


  export function serializeToHtml (nodes)  {
    if (!nodes || !Array.isArray(nodes)) {
      console.log("Invalid nodes:", nodes);
      return "";
    }

    return nodes
      .map((node) => {
        // Handle text nodes with marks
        if (node.text !== undefined) {
          let text = escapeHtml(node.text);
          if (node.bold) text = `<strong>${text}</strong>`;
          if (node.italic) text = `<em>${text}</em>`;
          if (node.underline) text = `<u>${text}</u>`;
          if (node.strikethrough) text = `<s>${text}</s>`;
          return text;
        }

        // Handle element nodes
        if (!node.children) {
          return "";
        }

        const children = serializeToHtml(node.children);

        switch (node.type) {
          case "paragraph":
            return `<p>${children}</p>`;
          case "heading-one":
            return `<h1>${children}</h1>`;
          case "heading-two":
            return `<h2>${children}</h2>`;
          case "heading-three":
            return `<h3>${children}</h3>`;
          case "blockquote":
            return `<blockquote>${children}</blockquote>`;
          case "numbered-list":
            return `<ol>${children}</ol>`;
          case "bulleted-list":
            return `<ul>${children}</ul>`;
          case "list-item":
            return `<li>${children}</li>`;
          case "link":
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
          default:
            return children;
        }
      })
      .join("");
  };

  // Helper function to escape HTML special characters
  const escapeHtml = (text) => {
    const htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    return text.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
  };

