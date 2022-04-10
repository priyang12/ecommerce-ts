import AlertDisplay from "../Components/AlertDisplay";
import Spinner from "../Components/Spinner";
import TimeoutBtn from "../Components/TimeoutBtn";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { DetailedProduct } from "../interfaces";

import {
  StyledProducts,
  StyledProductTitle,
} from "./StyledPages/StyledAdminProducts";
import { LoadProducts } from "../API/ProductAPI";
import { DeleteProductCall } from "../API/AdminAPI";
import { queryClient } from "../query";

const AdminProducts = () => {
  const history = useHistory();
  const [Redirect, setRedirect] = useState(false);
  const [Alert, setAlert] = useState({
    msg: "",
    type: false,
  });

  const {
    data: FetchData,
    isLoading,
    isError,
    error,
  }: {
    data: any;
    isLoading: boolean;
    isError: boolean;
    error: any;
  } = useQuery(["products"], LoadProducts);

  const { mutateAsync, isLoading: Deleting } = useMutation(DeleteProductCall, {
    onSuccess: (data) => {
      setAlert({ msg: data.msg, type: true });
      queryClient.invalidateQueries(["products"]);
    },
    onSettled: (data) => {
      setTimeout(() => {
        setAlert({ msg: "", type: false });
      }, 3000);
    },
    onError: (err: any) => {
      setAlert(err.data.msg);
    },
  });
  const Products: DetailedProduct[] = FetchData?.products;

  const DeleteProduct = (id: string) => {
    mutateAsync(id);
  };

  const AddNewProduct = (e: any) => {
    e.preventDefault();
    setAlert({ msg: "Redirecting to Product Edit", type: true });
    setRedirect(true);
    setTimeout(() => {
      history.push("/AdminProducts/add");
    }, 2000);
  };

  if (isLoading || Deleting) return <Spinner />;
  if (isError) return <AlertDisplay msg={error.msg} type={false} />;

  if (Redirect)
    return <AlertDisplay msg={Alert.msg + " Redirecting"} type={true} />;

  return (
    <section id="AdminProduct">
      {Alert.msg ? (
        <AlertDisplay msg={Alert.msg} type={Alert.type} />
      ) : (
        <form onSubmit={AddNewProduct}>
          <TimeoutBtn FormValue="Add New Product" Time={3000} classname="btn" />
        </form>
      )}
      {Products?.length > 0 ? (
        <ul>
          {Products.map((product: DetailedProduct, index: number) => (
            <StyledProducts className="Product-list" key={index}>
              <div className="right">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="left">
                <StyledProductTitle>{product.name}</StyledProductTitle>
                <h4>description</h4>
                <span>{product.description}</span>
                <div className="details">
                  <h3>brand : {product.brand}</h3>
                  <h3>Price : ${product.price}</h3>
                  <h3>countInStock : {product.countInStock}</h3>
                  <strong>category : {product.category}</strong>
                  <strong>
                    Last Updated : {product.updatedAt.slice(0, 10)}
                  </strong>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link
                  to={`/adminProducts/${product._id}`}
                  className="btn btn-light"
                >
                  Edit
                </Link>
                <button
                  className="btn delete"
                  onClick={() => DeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </StyledProducts>
          ))}
        </ul>
      ) : (
        <h1>No Products</h1>
      )}
    </section>
  );
};

export default AdminProducts;
