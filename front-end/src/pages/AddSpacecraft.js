import {
  Box, Button, Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";

function AddSpacecraft({ setSpacecraftList }) {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [mass, setMass] = useState("");

  const navigate = useNavigate();

  async function onAddClick() {
    const spacecraft = {
      name:name,
      speed:speed,
      mass:mass
    };
    try {
      const response = await post("/spacecraft/", { ...spacecraft });
      if (response.status === 201) {
        setSpacecraftList((value) => [...value, response.data.spacecraft]);
        navigate("/");
      } else {
        alert("Invalid");
      }
    } catch (error) {
      alert("Invalid");
      console.log(error);
    }
  }

  return (
    <Box textAlign="center" marginBottom="2em">
      <Heading>Add Spacecraft</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Spacecraft name"
          marginBottom={"1em"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         <Input
          placeholder="Spacecraft speed"
          marginBottom={"1em"}
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
         <Input
          placeholder="Spacecraft mass"
          marginBottom={"1em"}
          value={mass}
          onChange={(e) => setMass(e.target.value)}
        />
      </Box>
      <Button colorScheme="orange" marginTop="2em" onClick={onAddClick}>
        Add Spacecraft
      </Button>
    </Box>
  );
}

export default AddSpacecraft;
