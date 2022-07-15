import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import TimeoutBtn from "../../Components/TimeoutBtn";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DetailedProduct } from "../../interfaces";
import { StyledProducts, StyledProductTitle } from "./StyledAdminProducts";
import { useDeleteProduct, useDetailProducts } from "../../API/AdminAPI";

const AdminProducts = () => {
  const history = useHistory();
  const [Redirect, setRedirect] = useState(false);
  const [Alert, setAlert] = useState({
    msg: "",
    type: false,
  });

  const { data: FetchData, isLoading, isError, error } = useDetailProducts();

  const { mutateAsync, isLoading: Deleting } = useDeleteProduct(setAlert);

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
  if (isError)
    return <AlertDisplay msg={error?.message || "Server Error"} type={false} />;

  if (!FetchData) return <Spinner />;

  if (Redirect)
    return <AlertDisplay msg={Alert.msg + " Redirecting"} type={true} />;

  return (
    <section id="AdminProduct">
      {Alert.msg ? (
        <AlertDisplay msg={Alert.msg} type={Alert.type} />
      ) : (
        <form onSubmit={AddNewProduct}>
          <TimeoutBtn FormValue="Add New Product" Time={3000} className="btn" />
        </form>
      )}
      {FetchData.products?.length > 0 ? (
        <ul>
          {FetchData.products.map((product: DetailedProduct, index: number) => (
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
                    Last Updated :{" "}
                    {typeof product.updatedAt === "string"
                      ? product.updatedAt.slice(0, 10)
                      : product.updatedAt.toDateString()}
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
