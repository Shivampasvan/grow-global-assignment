import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (email !== "" && password !== "") {
      const userData = {
        email,
        password,
      };

      axios
        .post(
          `https://dull-rose-harp-seal-robe.cyclic.app/user/login`,
          userData
        )
        .then((res) => {
          toast({
            title: "Login Successful.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/dashboard");
        })
        .catch((err) => {
          toast({
            title: "Login UnSuccessful.",
            description: `${err.response.data}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "All Fields Required",
        description: `Please Fill Required Credentials`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Navbar />
      <Flex
        fontFamily={"Open Sans, sans-serif, Arial, Helvetica"}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading color={"#0066ff"} fontSize={"4xl"}>
              Sign in to your account
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"#0066ff"}>features</Link>
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"#0066ff"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"#0066ff"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleClick}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
