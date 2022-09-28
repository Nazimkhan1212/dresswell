import {
  Flex,
  Box,
  Link,
  Heading,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiShoppingBag, HiUser, HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;

  if (user.name) {
    userInfo.name = user.name;
  }

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      px="6"
      py="6"
      bgColor="gray.800"
      w="100%"
      pos="fixed"
      top="0"
      zIndex="99999"
    >
      <Heading
        as="h1"
        color="whiteAlpha.800"
        fontWeight="bold"
        letterSpacing="md"
        size="md"
      >
        <Link
          as={RouterLink}
          to="/"
          _hover={{ textDecor: "none", color: "gray.500" }}
        >
          DressWell
        </Link>
      </Heading>

      <Box
        display={{ base: "block", md: "none" }}
        onClick={() => setShow(!show)}
      >
        <Icon as={HiOutlineMenuAlt3} h="6" w="6" color="white" />
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: "3", md: "0" }}
        alignSelf={{ base: "flex-end", md: "none" }}
        alignItems="center"
      >
        <Link
          as={RouterLink}
          to="/cart"
          color="whiteAlpha.800"
          mr="5"
          fontSize="sm"
          letterSpacing="wide"
          display="flex"
          align="center"
          textTransform="uppercase"
          alignItems="center"
          fontWeight="bold"
          _hover={{ color: "gray.500", textDecor: "none" }}
        >
          <Icon as={HiShoppingBag} h="4" w="4" mr="1" />
          Cart
        </Link>

        {/* User Menu */}
        {userInfo ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDown />}
              _hover={{ textDecor: "none", opacity: 0.7 }}
            >
              {userInfo.name}
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link
            as={RouterLink}
            to="/login"
            color="whiteAlpha.800"
            mr="5"
            fontSize="sm"
            letterSpacing="wide"
            display="flex"
            textTransform="uppercase"
            alignItems="center"
            align="center"
            fontWeight="bold"
            _hover={{ color: "gray.500", textDecor: "none" }}
          >
            <Icon as={HiUser} h="4" w="4" mr="1" />
            Login
          </Link>
        )}

        {/* Admin Menu */}
        {userInfo && userInfo.isAdmin && (
          <Menu>
            <MenuButton
              ml="5"
              color="white"
              fontSize="sm"
              fontWeight="semibold"
              as={Link}
              textTransform="uppercase"
              _hover={{ textDecor: "none", opacity: "0.7" }}
            >
              Manage <Icon as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/admin/userlist">
                All Users
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/productlist">
                All Products
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/orderlist">
                All Orders
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  );
};
export default Header;
