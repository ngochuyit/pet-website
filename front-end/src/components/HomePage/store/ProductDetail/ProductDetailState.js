import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductDetailContext } from "../Context";

export default function ProductDetailState({ children }) {
  const [dog, setDog] = useState([]);
  const [cat, setCat] = useState([]);
  const [food, setFoods] = useState([]);
  const [ProductDetail, setProduct] = useState([]);

  const [PKTT, setPKTT] = useState([]);
  
   



  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/dogs`)
      .then((datas) => setDog(datas.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/cats`)
      .then((datas) => setCat(datas.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/foods`)
      .then((datas) => setFoods(datas.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/information/infor`)
      .then((datas) => setProduct(datas.data));
  }, []);

  
  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/product-Phu-Kien`)
      .then((datas) => setPKTT(datas.data));
  }, []);
  return (
    <>
      <ProductDetailContext.Provider
        value={{
          ProductDog: dog,
          ProductCat: cat,
          ProductFood: food,
          ProductDetail: ProductDetail,
          PKTT: PKTT,
        }}
      >
        {children}
      </ProductDetailContext.Provider>
    </>
  );
}
