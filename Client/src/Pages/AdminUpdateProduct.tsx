import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios, useForm } from "../Utils/CustomHooks";
import AlertDisplay from "../Components/AlertDisplay";
import Spinner from "../Components/Spinner";

import { FragmentContainer } from "../Components/StyledComponents/Container";

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
  const [
    ProductData,
    changeProductData,
    setProductData,
    ErrorState,
    setErrors,
  ] = useForm(initialState);

  const [UploadedImage, setUploadedImage] = useState<any>(null);

  const [Params, setParams] = useState<any>({
    method: "GET",
    url: `/api/products/${id}`,
  });
  const { Alert, Err, loading, FetchData } = useAxios(Params);

  const Product = FetchData;

  useEffect(() => {
    if (Product) {
      const productData: any = { ...initialState };
      for (const key in Product) {
        if (key in productData) productData[key] = Product[key];
      }
      setProductData(productData);
    }
  }, [Product, setProductData]);

  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({ ...ProductData, [name]: value });
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files && event.target.files[0]) {
        setUploadedImage({
          image: URL.createObjectURL(event.target.files[0]),
        });
      }
    }
  };

  const UpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParams({
      method: "PUT",
      url: `/api/upload`,
      data: UploadedImage,
    });
  };
  if (Alert === "Image Uploaded") {
    setParams({
      method: "PUT",
      url: `/api/products/product/${id}`,
      data: {
        ProductData,
      },
    });
  }
  if (loading) return <Spinner />;
  if (Err) return <div>{Err}</div>;
  if (!Product) return null;

  return (
    <FragmentContainer>
      <AlertDisplay msg={Alert} type={true} />
      <h1>Admin Update Product</h1>
      <form onSubmit={UpdateProduct}>
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
          <input
            type='text'
            name='description'
            id='description'
            value={ProductData.description}
            onChange={changeProductData}
            required
          />
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
          <input
            type='number'
            name='rice'
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
        <div className='form-control'>
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
      </form>
      <aside>
        <section>
          <h2>Product Image</h2>
          <img
            src={UploadedImage ? UploadedImage : ProductData.image}
            alt='product'
          />
          <input type='file' name='image' id='image' onChange={onImageChange} />
        </section>
      </aside>
    </FragmentContainer>
  );
};
export default AdminUpdateProduct;
