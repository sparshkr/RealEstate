import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  ConnectWallet,
  metamaskWallet,
  useConnect,
  ConnectButton,
} from "@thirdweb-dev/react";
import { useStateContext } from "../context";

const metamaskConfig = metamaskWallet({});

// override metadata
metamaskConfig.meta.name = "..."; // change the name
metamaskConfig.meta.iconURL =
  "https://imgs.search.brave.com/Qx5c8JjPgmpGzMSPm3YFy1X-069v3cRiayp10r0g39Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM2L01ldGFNYXNr/X0ZveC5zdmc.svg"; // change the icon

import { checkIfImage } from "../utils";
const indexOld = () => {
  const {
    address,
    contract,
    realEstate,
    createPropertyFunction,
    getPropertiesData,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress: "",
  });

  const handleFormFieldChange = (fieldname, e) => {
    setForm({ ...form, [fieldname]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.images, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createPropertyFunction({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
        });
      } else {
        alert("Please provide valid url");
        setForm({ ...form, images: "" });
      }
    });
  };

  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);
  console.log(properties);
  return (
    <div>
      <h1>{realEstate}</h1>
      <ConnectWallet
        supportedWallets={[metamaskConfig]}
        clientId="0d7a273a86b230233dfc99e7cb2c676a"
        theme="dark"
      />
      {/* <p>{address}</p> */}
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="propertyTitle"
            onChange={(e) => handleFormFieldChange("propertyTitle", e)}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="description"
            onChange={(e) => handleFormFieldChange("description", e)}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="category"
            onChange={(e) => handleFormFieldChange("category", e)}
          ></input>
        </div>
        <div>
          <input
            type="number"
            placeholder="price"
            onChange={(e) => handleFormFieldChange("price", e)}
          ></input>
        </div>
        <div>
          <input
            type="url"
            placeholder="images"
            onChange={(e) => handleFormFieldChange("images", e)}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="propertyAddress"
            onChange={(e) => handleFormFieldChange("propertyAddress", e)}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default indexOld;
