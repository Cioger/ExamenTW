import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";

const RoleList = ["Commander","Captain","Grunt"];

function AddAstronaut({ spacecraftList, setAstronautList }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [spacecraft, setSpacecraft] = useState();

  const navigate = useNavigate();
  
  const onChangeSelect = (e) => {
    if(e.target.name==="role")setRole(e.target.value)
    else setSpacecraft(e.target.value);
  };
  

  async function onAddClick() {
    const astronaut = {
      name: name,
      role: role,
      spacecraftId: spacecraft,
    };
      try {
        const response = await post("/astronaut/", { ...astronaut });
        if (response.status === 201) {
          setAstronautList((value) => [...value, response.data.astronaut]);
          navigate("/astronauts");
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
      <Heading>Add Astronaut</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Name"
          marginBottom={"1em"}
          value={name}
          isRequired={true}
          onChange={(e) => setName(e.target.value)}
        />
        <Select name="role"
          onChange={onChangeSelect}
          marginBottom={"1em"}
          isRequired={true}
          defaultValue={RoleList[0]}
        >
          {RoleList.map((r) => (
            <option value={r} key={r}>
              {r}
            </option>
          ))}
        </Select>
        <Select name="spacecraft"
          placeholder="Spacecraft"
          onChange={onChangeSelect}
          isRequired={true}
          defaultValue={spacecraft}
        >
          {spacecraftList.map((s) => (
            <option value={s.id} key={s.id}>
              {s.name}
            </option>
          ))}
        </Select>
      </Box>
      <Button colorScheme="orange" marginTop="2em" onClick={onAddClick}>
        Add Astronaut
      </Button>
    </Box>
  );
}

export default AddAstronaut;
