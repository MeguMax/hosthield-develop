import React, { useState } from "react";
//Icons
import { IoIosClose } from "react-icons/io";

export default function TagInput({
  tags,
  placeholder,
  limit,
  setAppliancesList,
  appliancesList,
  inputClasses = "",
  tagBgColor,
  tagTextColor,
  tagCloseIconColor,
  name,
}) {
  const [count, setCount] = useState(0);
  if (inputClasses === "") {
    inputClasses =
      "bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md";
  }
  const removeTagData = (indexToRemove) => {
    setAppliancesList([...appliancesList.filter((_, index) => index !== indexToRemove)]);
    setCount(count - 1);
  };
  const addTagData = (event) => {
    if (event.target.value !== "") {
      if (count <= 10) {
        setAppliancesList([...appliancesList, event.target.value.replace(",", "")]);
        event.target.value = "";
      }
      setCount(count + 1);
    }
  };
  return (
    <>
      <input
        className={`${inputClasses}`}
        type="text"
        onKeyUp={(event) =>
          event.key === "enter" || event.key === "," ? addTagData(event) : null
        }
        placeholder={placeholder}
        readOnly={count === parseInt(limit, 10) ? true : false}
        name={name}
      />
      <ul className="flex flex-wrap">
        {appliancesList.map((tag, index) => (
          <li
            key={index}
            className={`tag mt-2 mr-2 p-0.5 ${tagBgColor} rounded-2xl`}
          >
            <span
              className={`inline-block pt-1 pl-2 pr-1 pb-1.5 tag-title text-xs px-1 ${tagTextColor}`}
            >
              {tag}
            </span>
            <span onClick={() => removeTagData(index)}>
              <IoIosClose className={`inline-block ${tagCloseIconColor}`} />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
