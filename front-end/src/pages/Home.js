import {
  Box,
  Button,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SpacecraftList from "../components/spacecraft/SpacecraftList";

function Home({ spacecraftList, setSpacecraftList }) {
  const [spacecraftName, setSpacecraftName] = useState("");
 
  return (
    <Box>
      <Box textAlign="center" marginBottom="2em">
        <Heading>Spacecraft</Heading>
        <Box width="60vw" mx="auto" mt="1em">
          <Text as="h4">Filter by name</Text>
          <Input
            placeholder="Name"
            marginBottom={"1em"}
            value={spacecraftName}
            onChange={(e) => setSpacecraftName(e.target.value)}
          />
        </Box>
      </Box>
      <Link to="/spacecraft/add">
        <Button colorScheme="orange" marginBottom="1em">
          Add Spacecraft
        </Button>
      </Link>

      <SpacecraftList
        spacecraftList={spacecraftList}
        setSpacecraftList={setSpacecraftList}
        name={spacecraftName}
      />
    </Box>
  );
}

export default Home;
