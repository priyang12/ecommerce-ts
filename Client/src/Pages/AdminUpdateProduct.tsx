import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios, useForm } from "../Utils/CustomHooks";
import AlertDisplay from "../Components/AlertDisplay";
import Spinner from "../Components/Spinner";

import { StyledContainer } from "../Components/StyledComponents/Container";
import {
  StyledEditProduct,
  StyledImageContainer,
} from "./StyledPages/StyledAdminUpdateProduct";

const initialState = {
  numReviews: "0",
  price: "",
  countInStock: "",
  name: "",
  image: "",
  description: "",
  brand: "",
  category: "",
};

const AdminUpdateProduct = () => {
  const { id } = useParams<{ id: string }>();

  const [UploadedImage, setUploadedImage] = useState<any>(null);
  const [ImageFile, setImageFile] = useState<any>(null);

  const [
    ProductData,
    changeProductData,
    setProductData,
    ErrorState,
    setErrors,
  ] = useForm(initialState);

  const [Params, setParams] = useState<any>({
    method: "GET",
    url: `/api/products/product/${id}`,
  });
  const { Alert, Err, loading, FetchData } = useAxios(Params);

  const Product = FetchData?.product ? FetchData.product : FetchData;

  useEffect(() => {
    if (Product) {
      const productData: any = { ...initialState };
      for (const key in Product) {
        if (key in productData) productData[key] = Product[key];
      }
      setProductData(productData);
    }
  }, [id, Product]);

  // // useEffect(() => {
  // //   if (Alert === "Image Uploaded") {
  // //     setParams({
  // //       method: "PUT",
  // //       url: `/api/products/product/${id}`,
  // //       data: {
  // //         ProductData,
  // //       },
  // //     });
  // //   }
  // // }, [Alert, ProductData, id, Params]);

  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({ ...ProductData, [name]: value });
  };

  const changeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...ProductData, [name]: value });
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setUploadedImage({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  console.log(ImageFile);
  const UpdateProduct = () => {
    if (ImageFile) {
      setParams({
        method: "PUT",
        url: `/api/upload`,
        data: ImageFile,
      });
    } else {
      console.log(ProductData);
      setParams({
        method: "PUT",
        url: `/api/products/product/${id}`,
        data: ProductData,
      });
    }
  };
  // console.log(ProductData);
  if (loading) return <Spinner />;
  if (Err) return <div>{Err}</div>;
  if (!Product) return null;

  return (
    <StyledContainer theme={{ marginTop: 2 }}>
      {Alert && <AlertDisplay msg={Alert} type={true} />}
      <h1 className='display'>Admin Update Product</h1>
      <StyledEditProduct>
        <form>
          <div className='form-control'>
            <input
              type='text'
              name='name'
              id='name'
              value={ProductData.name}
              onChange={changeProductData}
              required
            />
            <span className='bar'></span>
            <label htmlFor='name'>
              {ErrorState.name ? (
                <span className='error'>{ErrorState.name}</span>
              ) : (
                "Product Name"
              )}
            </label>
          </div>
          <div className='form-control'>
            <textarea
              name='description'
              id='description'
              rows={5}
              value={ProductData.description}
              onChange={changeTextarea}
              required
            ></textarea>

            <span className='bar'></span>
            <label htmlFor='description'>
              {ErrorState.description ? (
                <span className='error'>{ErrorState.description}</span>
              ) : (
                "Product Description"
              )}
            </label>
          </div>
          <div className='form-control'>
            <input
              type='text'
              name='brand'
              id='brand'
              value={ProductData.brand}
              onChange={changeProductData}
              required
            />
            <span className='bar'></span>
            <label htmlFor='brand'>
              {ErrorState.brand ? (
                <span className='error'>{ErrorState.brand}</span>
              ) : (
                "Brand"
              )}
            </label>
          </div>
          <div className='form-control'>
            <input
              type='number'
              name='countInStock'
              id='countInStock'
              value={ProductData.countInStock}
              onChange={changeProductData}
              required
            />
            <span className='bar'></span>
            <label htmlFor='countInStock'>
              {ErrorState.countInStock ? (
                <span className='error'>{ErrorState.countInStock}</span>
              ) : (
                "CountInStock"
              )}
            </label>
          </div>
          <div className='form-control'>
            <div>Category</div>
            <select
              name='category'
              onChange={changeSelect}
              defaultValue={ProductData.category}
            >
              <option value='Electronics'>Electronics</option>
              <option value='Fashion'>Fashion</option>
              <option value='Grocery'>Grocery</option>
              <option value='Carpenter'>Carpenter</option>
              <option value='Health'>Health</option>
              <option value='Home'>Home</option>
            </select>
          </div>
          <div className='form-control'>
            <input
              type='number'
              name='price'
              id='price'
              value={ProductData.price}
              onChange={changeProductData}
              required
            />
            <span className='bar'></span>
            <label htmlFor='price'>
              {ErrorState.price ? (
                <span className='error'>{ErrorState.price}</span>
              ) : (
                "Product Price"
              )}
            </label>
          </div>
        </form>
        <StyledImageContainer>
          <h2>Product Image</h2>
          <img
            src={UploadedImage ? UploadedImage.image : ProductData.image}
            alt='Product'
          />
          <input type='file' name='image' id='image' onChange={onImageChange} />
          <button className='btn' onClick={UpdateProduct}>
            Update Product
          </button>
        </StyledImageContainer>
      </StyledEditProduct>
    </StyledContainer>
  );
};
export default AdminUpdateProduct;
