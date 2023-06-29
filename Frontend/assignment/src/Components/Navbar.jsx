import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Box
        style={{
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "space-evenly",
          gap: "50px",
          padding: "30px",
        }}
      >
        <Button>
          <Link to={"/login"}>Login</Link>
        </Button>

        <Button>
          <Link to={"/signup"}>SignUp</Link>
        </Button>
      </Box>
      <Text
        style={{
          fontSize: "40px",
          padding: "30px",
          textAlign:"center"
        }}
      >
        Welcome to Our App
      </Text>
    </>
  );
};

export default Navbar;
