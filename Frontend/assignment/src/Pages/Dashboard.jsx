import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, useToast } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import DashNavbar from "../Components/DashNavbar";
import Delete from "../Components/Delete";
import Update from "../Components/Update";

const Dashboard = () => {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [refs, setRefs] = useState(false);
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user[0].name;
  console.log("user", post);
  // let param = useParams();

  const handleRef = () => {
    setRefs(!refs);
  };

  const getData = () => {
    axios
      .get(`https://dull-rose-harp-seal-robe.cyclic.app/post/get`, {
        headers: {
          user: `${name}`,
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  const clearData = () => {
    setDesc("");
    setTitle("");
  };

  useEffect(() => {
    getData();
  }, [refs]);

  const handleClick = () => {
    const newpost = {
      title,
      desc,
      user: name,
    };
    if (title !== "" && desc !== "") {
      axios
        .post(`https://dull-rose-harp-seal-robe.cyclic.app/post/add`, newpost)
        .then((res) => {
          getData();
          clearData();
        })
        .catch((err) => console.log(err));
    } else {
      toast({
        title: "Warning",
        description: "You need to fill all fields to post.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = () => {};
  return (
    <>
      <DashNavbar />
      <div
        style={{
          border: "2px solid gray",
          borderRadius: "5px",
          display: "grid",
          width: "30%",
          margin: "auto",
          padding: "50px",
          gap: "30px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Input
          type="text"
          placeholder="enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Input
          type="text"
          placeholder="enter description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <Button
          onClick={handleClick}
          style={{ width: "30%", marginLeft: "100px" }}
        >
          add post
        </Button>
      </div>

      {post?.map((el, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            border: "2px solid gray",
            borderRadius: "5px",
            width: "60%",
            margin: "auto",
            gap: "10px",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid silver",
              borderRadius: "5px",
              width: "30%",
              padding: "5px",
            }}
          >
            Title - {el.title}
          </div>
          <div
            style={{
              border: "1px solid silver",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            Description - {el.desc}
          </div>
          <div style={{ margin: "auto", display: "flex", gap: "10px" }}>
            <Delete id={el._id} setRefs={setRefs} refs={refs} />
            <Update id={el._id} setRefs={setRefs} refs={refs} {...el} />
            {/* <Button onClick={handleUpdate}>update</Button>{" "} */}
            {/* <Button onClick={handleDelete}>delete</Button> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
