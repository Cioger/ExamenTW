import { Box, Button, Heading, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AstronautList from "../components/astronaut/AstronautList";

function AstronautPage({ astronautList, setAstronautList, canEdit }) {
  const [astronautName, setAstronautName] = useState("");

  return (
    <Box>
      <Box textAlign="center" marginBottom="2em">
        <Heading>Astronauts</Heading>
        <Box width="60vw" mx="auto" mt="1em">
          <Text as="h4">Filter by name</Text>
          <Input
            placeholder="Astronaut Name"
            marginBottom={"1em"}
            value={astronautName}
            onChange={(e) => setAstronautName(e.target.value)}
          />
        </Box>
      </Box>
      <Link to="/astronaut/add">
        <Button colorScheme="orange" marginBottom="1em">
          Add Astronaut
        </Button>
      </Link>

      <AstronautList
        astronautList={astronautList}
        setAstronautList={setAstronautList}
        astronautName={astronautName}
        canEdit={canEdit}
      />
    </Box>
  );
}

export default AstronautPage;
