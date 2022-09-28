import { Flex, Text } from "@chakra-ui/react";
const Footer = () => {
  return (
    <Flex as="footer" justify="center" py="5">
      <Text>Copyright {new Date().getFullYear()}. All Rights Reserved.</Text>
    </Flex>
  );
};
export default Footer;
