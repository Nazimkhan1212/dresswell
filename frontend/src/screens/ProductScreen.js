import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Link,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = productCreateReview;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    if (successReview) {
      alert("Review sumbitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [id, dispatch, successReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Flex mb="5">
        <Button
          as={RouterLink}
          to="/"
          color="white"
          //   bgColor="gray.800"
          colorScheme="red"
        >
          Go Back
        </Button>
      </Flex>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid
            templateColumns={{
              base: "2fr",
              lg: "5fr 4fr 3fr",
            }}
            w={{ base: "full", md: "auto" }}
            gap="10"
            m="3"
            p="3"
          >
            {/* column1 */}
            <Image src={product.image} alt={product.name} borderRadius="md" />

            {/* column 2 */}
            <Flex direction="column">
              <Heading as="h6" fontSize="sm" color="gray.500">
                {product.brand}
              </Heading>
              <Heading as="h2" fontSize="2xl" fontWeight="bold" mb="2">
                {product.name}
              </Heading>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <Heading
                as="h5"
                fontSize="3xl"
                my="5"
                fontWeight="bold"
                color="teal.600"
              >
                ₹{product.price}
              </Heading>
              <Text>{product.description}</Text>
            </Flex>

            {/* column3 */}
            <Flex direction="column">
              <Flex justify="space-between" py="3">
                <Text>Price:</Text>
                <Text fontWeight="bold">₹{product.price}</Text>
              </Flex>
              <Flex justify="space-between" py="3">
                <Text>Status:</Text>
                <Text fontWeight="bold">
                  {product.countInStock > 0 ? "In Stock" : "out of stock"}
                </Text>
              </Flex>

              <Divider />

              {product.countInStock > 0 && (
                <Flex justify="space-between" py="3">
                  <Text>Qty:</Text>
                  <Select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    width="30%"
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}

              <Button
                bgColor="gray.800"
                colorScheme="teal"
                letterSpacing="wide"
                textTransform="uppercase"
                py="2"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Flex>
          </Grid>

          {/* Review Form */}
          <Box mt="10">
            <Box>
              <Heading as="h2" size="xl" mb="4">
                Reviews
              </Heading>
              {product.reviews.length === 0 && <Message>No reviews</Message>}

              {product.reviews.length !== 0 && (
                <Box p="4" bgColor="white" rounded="md" mb="1" mt="5">
                  {product.reviews.map((review) => (
                    <Flex direction="column" key={review._id} mb="5">
                      <Flex justifyContent="space-between">
                        <Text fontSize="lg">
                          <strong>{review.name}</strong>
                          {review.craetedAt?.substring(0, 10)}
                        </Text>
                        <Rating value={review.rating} />
                      </Flex>
                      <Text mt="2">{review.comment}</Text>
                    </Flex>
                  ))}
                </Box>
              )}

              {/* Form */}
              <Box
                p="10"
                bgColor="white"
                rounded="md"
                border="2px"
                mt="10"
                borderColor="gray.300"
              >
                <Heading as="h3" size="lg" mb="6">
                  Write a review
                </Heading>
                {loadingReview && <Loader />}
                {errorReview && <Message type="error">{errorReview}</Message>}

                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <FormControl id="rating" mb="3">
                      <FormLabel>Rating</FormLabel>
                      <Select
                        placeholder="Select Option"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option>select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Okay</option>
                        <option value="3">3 - Goor</option>
                        <option value="4">4 - Very Goor</option>
                        <option value="5">5 - Excellent</option>
                      </Select>
                    </FormControl>
                    <FormControl id="comment" mb="3">
                      <FormLabel>Comment</FormLabel>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Textarea>
                    </FormControl>

                    <Button colorScheme="teal" type="submit">
                      Post Review
                    </Button>
                  </form>
                ) : (
                  <Message>
                    Please{" "}
                    <Link as={RouterLink} to="/login">
                      login
                    </Link>{" "}
                    to write a review
                  </Message>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default ProductScreen;
