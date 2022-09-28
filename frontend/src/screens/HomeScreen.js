import { useEffect } from "react";
import { Heading, Grid, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Box>
      <Heading as="h2" fontSize="3xl" mb="8">
        Latest Products
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr",
          }}
          gap="8"
        >
          {products.map((prod) => (
            <Product key={prod._id} product={prod} />
          ))}
        </Grid>
      )}
    </Box>
  );
};
export default HomeScreen;
