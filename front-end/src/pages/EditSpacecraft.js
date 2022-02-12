import {
  Box,
  Button,
  Heading,
  Input,
  Flex,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AstronautCard from "../components/astronaut/AstronautCard";
import { get, patch } from "../utils/useAxios";

function EditSpacecraft({ spacecraftList, setSpacecraftList, canEdit }) {
  let { id } = useParams();
  id = parseInt(id);
  const spacecraft = spacecraftList.filter((s) => s.id == id)[0];
  const [name, setName] = useState(spacecraft.name);
  const [speed, setSpeed] = useState(spacecraft.speed);
  const [mass, setMass] = useState(spacecraft.mass);
  const [astronauts, setAstronauts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const response = await get(`/astronaut/bySpacecraft/${spacecraft.id}/${offset}`);
        if (response.status === 200) {
          setAstronauts(response.data.rows);
          setCount((value) => value + 1);
          setTotalCount(response.data.count);
        }
      } catch (error) {
        alert("error");
      }
    };
    fetchAstronauts();
  }, []);

  const onNextPageClick = async () => {
    try {
      const response = await get(`/astronaut/bySpacecraft/${spacecraft.id}/${offset + 1}`);
      if (response.status === 200) {
        setOffset((value) => value + 1);
        setCount((value) => value + 1);
        setAstronauts(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  const onPreviousPageClick = async () => {
    try {
      const response = await get(`/astronaut/bySpacecraft/${spacecraft.id}/${offset - 1}`);
      if (response.status === 200) {
        setOffset((value) => value - 1);
        setCount((value) => value - 1);
        setAstronauts(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  async function onEditClick() {
    try {
      const response = await patch(`/spacecraft/${spacecraft.id}`, {
        name,speed,mass
      });
      if (response.status === 200) {
        setSpacecraftList((value) => {
          let newSpacecraft = spacecraftList.filter((s) => s.id != id);
          newSpacecraft = [...newSpacecraft, response.data.spacecraft];
          return newSpacecraft;
        });
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
      <Heading>Edit Spacecraft </Heading>
      <Text>{spacecraft.name}</Text>
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
          placeholder="Spacecraft name"
          marginBottom={"1em"}
          value={mass}
          onChange={(e) => setMass(e.target.value)}
        />
      </Box>
      <Button colorScheme="orange" marginTop="2em" onClick={onEditClick}>
        Edit Spacecraft
      </Button>
      <Box w="80vh" mx="auto">
        {astronauts.map((astronaut) => (
          <Box textAlign={"left"} key={astronaut.id}>
            <AstronautCard astronaut={astronaut} canEdit={canEdit} />
          </Box>
        ))}
        {totalCount > 0 && (
          <Flex justifyContent={"space-between"}>
            <Button
              colorScheme="yellow"
              marginTop="2em"
              onClick={onPreviousPageClick}
              disabled={offset <= 0}
            >
              Previous page
            </Button>
            <Button
              colorScheme="yellow"
              marginTop="2em"
              onClick={onNextPageClick}
              disabled={totalCount <= count}
            >
              Next page
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default EditSpacecraft;
