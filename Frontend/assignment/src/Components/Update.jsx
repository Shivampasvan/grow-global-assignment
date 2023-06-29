import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Update = ({ id, title, desc, refs, setRefs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tit, setTit] = useState(title);
  const [des, setDes] = useState(desc);
  const toast = useToast();
  const handlUpdate = () => {
    const payload = {
      title: tit,
      desc: des,
    };

    axios
      .patch(
        `https://dull-rose-harp-seal-robe.cyclic.app/post/update/${id}`,
        payload
      )
      .then((res) => {
        setRefs(!refs);
        toast({
          title: "Update Successful",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Warning",
          description: "You need to fill all fields to post.",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button onClick={onOpen} style={{ backgroundColor: "skyblue" }}>
        Update Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ display: "grid", gap: "15px" }}>
            <div>
              <label>Title : </label>
              <input
                style={{ border: "1px solid silver", borderRadius: "5px" }}
                type="text"
                value={tit}
                onChange={(e) => {
                  setTit(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Description : </label>
              <input
                style={{ border: "1px solid silver", borderRadius: "5px" }}
                type="text"
                value={des}
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                handlUpdate();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Update;
