import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../Utils/CustomHooks";
import { StyledContainer } from "../../Components/StyledComponents/Container";
import { useMutation, useQuery } from "react-query";
import { SingleProductCall } from "../../API/ProductAPI";
import { AddProductCall, EditProductCall } from "../../API/AdminAPI";
import { queryClient } from "../../query";
import {
  StyledEditProduct,
  StyledImageContainer,
} from "./StyledAdminUpdateProduct";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";

const initialState = {
  name: "Sample name",
  price: 0,
  image: "https://ik.imagekit.io/5aalo5l7bu7/sample_a81IvE0ug.webp",
  brand: "Sample brand",
  category: "Sample category",
  countInStock: 0,
  numReviews: 0,
  description: "Sample description",
};

const AdminUpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const Type = id === "add" ? true : false;
  const [Alert, setAlert] = useState({
    msg: "",
    type: false,
  });
  const [UploadedImage, setUploadedImage] = useState<any>(null);
  const [ImageFile, setImageFile] = useState<any>(null);
  const [ProductData, changeProductData, setProductData, ErrorsState] = useForm(
    {
      name: "",
      price: 0,
      image: "",
      brand: "",
      category: "",
      countInStock: 0,
      numReviews: 0,
      description: "",
    }
  );

  const {
    data: Product,
    error: Err,
    isLoading,
  } = useQuery([`product/${id}`, id], () => SingleProductCall(id), {
    enabled: !Type,
  });
  const { mutate: AddMutation, isLoading: LoadAdding } = useMutation(
    "addProduct" as any,
    AddProductCall,
    {
      onSuccess: () => {
        setAlert({ msg: "Product added successfully", type: true });
        queryClient.invalidateQueries(["products"]);
        setTimeout(() => {
          setAlert({ msg: "", type: false });
          // Redirect to the product page
          window.location.href = "/AdminProducts";
        }, 3000);
      },
      onError: (err: any) => {
        setAlert(err.data.msg);
      },
    }
  );
  const { mutate: UpdateMutate, isLoading: Updating } = useMutation(
    "updateProduct",
    EditProductCall,
    {
      onSuccess: (data) => {
        setAlert({ msg: data.msg, type: true });
        queryClient.invalidateQueries(["products"]);
      },
      onError: (err: any) => {
        setAlert(err.data.msg);
      },
    }
  );

  useEffect(() => {
    if (Product) {
      const productData: any = { ...initialState };
      for (const key in Product) {
        if (key in productData) productData[key] = Product[key];
      }
      setProductData(productData);
    } else {
      setProductData(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Product]);

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
  function Formate() {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("image", ImageFile);
    formData.append("name", ProductData.name);
    formData.append("price", ProductData.price);
    formData.append("countInStock", ProductData.countInStock);
    formData.append("description", ProductData.description);
    formData.append("brand", ProductData.brand);
    formData.append("category", ProductData.category);
    formData.append("numReviews", ProductData.numReviews);
    return formData;
  }
  const AddProduct = async () => {
    const formData = Formate();
    AddMutation(formData);
  };
  const UpdateProduct = () => {
    const formData = Formate();
    UpdateMutate(formData);
  };

  if (isLoading || Updating || LoadAdding) return <Spinner />;
  if (Err) return <div>Server Error</div>;

  return (
    <StyledContainer theme={{ marginTop: 2 }}>
      {Alert.msg && <AlertDisplay msg={Alert.msg} type={true} />}
      <h1 className="display">
        {Type ? "Add New Product" : "Admin Update Product"}
      </h1>
      <StyledEditProduct>
        <form>
          <div className="form-control">
            <input
              type="text"
              name="name"
              id="name"
              value={ProductData.name}
              onChange={changeProductData}
              required
            />
            <span className="bar"></span>
            <label htmlFor="name">
              {ErrorsState.name ? (
                <span className="error">{ErrorsState.name}</span>
              ) : (
                "Product Name"
              )}
            </label>
          </div>
          <div className="form-control">
            <textarea
              name="description"
              id="description"
              rows={5}
              value={ProductData.description}
              onChange={changeTextarea}
              required
            ></textarea>

            <span className="bar"></span>
            <label htmlFor="description">
              {ErrorsState.description ? (
                <span className="error">{ErrorsState.description}</span>
              ) : (
                "Product Description"
              )}
            </label>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="brand"
              id="brand"
              value={ProductData.brand}
              onChange={changeProductData}
              required
            />
            <span className="bar"></span>
            <label htmlFor="brand">
              {ErrorsState.brand ? (
                <span className="error">{ErrorsState.brand}</span>
              ) : (
                "Brand"
              )}
            </label>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="countInStock"
              id="countInStock"
              value={ProductData.countInStock}
              onChange={changeProductData}
              required
            />
            <span className="bar"></span>
            <label htmlFor="countInStock">
              {ErrorsState.countInStock ? (
                <span className="error">{ErrorsState.countInStock}</span>
              ) : (
                "CountInStock"
              )}
            </label>
          </div>
          <div className="form-control">
            <div>Category</div>
            <select
              name="category"
              onChange={changeSelect}
              defaultValue={ProductData.category}
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Grocery">Grocery</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Health">Health</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="price"
              id="price"
              value={ProductData.price}
              onChange={changeProductData}
              required
            />
            <span className="bar"></span>
            <label htmlFor="price">
              {ErrorsState.price ? (
                <span className="error">{ErrorsState.price}</span>
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
            alt="Product"
          />
          <input
            type="file"
            name="image"
            id="image"
            onChange={onImageChange}
            data-testid="UploadImage"
          />

          <button className="btn" onClick={Type ? AddProduct : UpdateProduct}>
            {Type ? "Add Product" : "Update Product"}
          </button>
        </StyledImageContainer>
      </StyledEditProduct>
    </StyledContainer>
  );
};
export default AdminUpdateProduct;
