import React, { useEffect, useState } from "react";

import {
  Header,
  Banner,
  Live,
  Service,
  Product,
  TopSeller,
  Collection,
  Footer,
  Copyright,
} from "../PageComponents/Components";

import { useStateContext } from "../context";
import { getTopCreators } from "../utils";
import { Contract } from "ethers";

const index = () => {
  const { address, contract, getPropertiesData } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);

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

  const housing = [];
  const office = [];
  const rental = [];
  const farmhouse = [];
  // const rental = [];
  const country = [];
  const commercial = [];

  if (!isLoading) {
    properties.map((el, i) => {
      if (el.category === "country") {
        country.push(el);
      } else if (el.category === "commercial") {
        commercial.push(el);
      } else if (el.category === "office") {
        office.push(el);
      } else if (el.category === "rental") {
        rental.push(el);
      } else if (el.category === "farmhouse") {
        farmhouse.push(el);
      } else if (el.category === "housing") {
        housing.push(el);
      }
    });
  }

  const creators = getTopCreators(properties);
  // console.log(creator);

  return (
    <div>
      <Header></Header>
      <Banner></Banner>
      <Live properties={properties}></Live>
      <TopSeller creators={creators}></TopSeller>
      <Collection
        housing={housing?.length}
        rental={rental?.length}
        farmhouse={farmhouse?.length}
        office={office?.length}
      ></Collection>
      <Footer></Footer>
      <Copyright></Copyright>
    </div>
  );
};

export default index;
