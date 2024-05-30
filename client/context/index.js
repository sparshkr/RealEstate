import { useState, useEffect, useContext, createContext } from "react";

import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useContractEvents,
  ConnectWallet,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

import { contractAbi } from "../constant";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xC7d104CC49D224aEd9B23A494343b38311AE2C07",
    contractAbi
  );
  //   console.log(contract);
  const address = useAddress();
  const connect = useMetamask();

  const realEstate = "Real Estate dapp";

  const {
    mutateAsync: listProperty,
    isLoading,
    isError,
  } = useContractWrite(contract, "listProperty");

  const createPropertyFunction = async (form) => {
    // console.log(form);
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;
    try {
      const data = await listProperty({
        args: [
          address,
          price,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
      console.info("Success", data);
    } catch (err) {
      console.error("Failure", err);
    }
  };

  const { mutateAsync: updateProperty, isLoading: updatePropertyLoading } =
    useContractWrite(contract, "updateProperty");

  const updatePropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;

    try {
      const data = await updateProperty({
        args: [
          address,
          productId,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
      console.info("Success", data);
    } catch (e) {
      console.log(e);
    }
  };

  const { mutateAsync: updatePrice, isLoading: updatePriceLoading } =
    useContractWrite(contract, "updatePrice");

  const updatePriceFunction = async (form) => {
    const { productId, price } = form;

    try {
      const data = await updatePrice({
        args: [address, productId, price],
      });
      console.info("Success", data);
    } catch (e) {
      console.log(e);
    }
  };
  const { mutateAsync: buyProperty, isLoading: buyPropertyLoading } =
    useContractWrite(contract, "buyProperty");

  const buyPropertyFunction = async (form) => {
    const { id } = form;

    try {
      const data = await buyProperty({
        args: [id, address],
      });
      console.info("Success", data);
    } catch (e) {
      console.log(e);
    }
  };
  const { mutateAsync: addReview, isLoading: addReviewLoading } =
    useContractWrite(contract, "addReview");

  const addReviewFunction = async (form) => {
    const { productId, rating, comment } = form;

    try {
      const data = await addReview({
        args: [productId, rating, comment],
      });
      console.info("Success", data);
    } catch (e) {
      console.log(e);
    }
  };
  const { mutateAsync: likeRiview, isLoading: likeRiviewLaoding } =
    useContractWrite(contract, "addReview");

  const likeRiviewFunction = async (form) => {
    const { productId, reviewIndex } = form;

    try {
      const data = await likeRiview({
        args: [productId, reviewIndex],
      });
      console.info("Success", data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPropertiesData = async () => {
    try {
      const properties = await contract.call("getAllProperties");

      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productId: property.productID.toNumber(),
        reviewers: property.reviewers,
        reviews: property.reviews,
        image: property.images,
        address: property.propertyAddress,
      }));

      return parsedProperties;
      console.log(properties);
    } catch (e) {
      console.log("error" + e);
    }
  };

  const {
    data: getHighestRatedProduct,
    isLoading: getHighestRatedProductLoading,
  } = useContractRead(contract, "getHighestratedProduct");

  const getProductReviewsFunction = (productId) => {
    try {
      const { data: getProductReviews, isLoading: getProductReviewsFunction } =
        useContractRead(contract, "getProductReviews");

      return getProductReviews, getProductReviewsFunction;
    } catch (e) {
      console.log(e);
    }
  };

  const getPropertyFunction = (id) => {
    try {
      const { data: getProperty, isLoading: getPropertyLoading } =
        useContractRead(contract, "getProperty");

      return getProperty, getPropertyLoading;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        realEstate,
        createPropertyFunction,
        getPropertiesData,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        addReviewFunction,
        likeRiviewFunction,
        getHighestRatedProduct,
        getProductReviewsFunction,
        getProductReviews,
        getPropertyFunction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
