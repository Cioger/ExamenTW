import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patch } from "../utils/useAxios";

const RoleList = ["Commander","Captain","Grunt"];
function EditAstronaut({ spacecraftList, setAstronautList, astronautList }) {
  let { id } = useParams();
  id = parseInt(id);
  const astronaut = astronautList.filter((a) => a.id == id)[0];
  const [name, setName] = useState(astronaut.name);
  const [role, setRole] = useState(astronaut.role);
  const [spacecraft, setSpacecraft] = useState(astronaut.spacecraftListId);

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    if(e.target.name==="role")setRole(e.target.value)
    else setSpacecraft(e.target.value);
  };
  

  async function onEditClick() {
    const astronaut = {
      name: name,
      role: role,
      spacecraftListId: spacecraft,
    };
      try {
        const response = await patch(`/astronaut/${id}`, { ...astronaut });
        if (response.status === 200) {
          setAstronautList((value) => {
            let newAstronauts = astronautList.filter((a) => a.id != id);
            newAstronauts = [...newAstronauts, response.data.astronaut];
            return newAstronauts;
          });
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
          defaultValue={spacecraft}
        >
          {spacecraftList.map((s) => (
            <option value={s.id} key={s.id}>
              {s.name}
            </option>
          ))}
        </Select>
      </Box>
      <Button colorScheme="orange" marginTop="2em" onClick={onEditClick}>
        Edit Astronaut
      </Button>
    </Box>
  );
}

export default EditAstronaut;
