import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";


function SpacecraftCard({ spacecraft, setSpacecraftList }) {

  const onDeleteClick = async () => {
    try {
      const response = await remove(`/spacecraft/${spacecraft.id}`)
      if(response.status == 200) {
        setSpacecraftList(value => {
          const newSpacecraft = value.filter(s => s.id != spacecraft.id)
          return newSpacecraft
        })
      } 
    } catch (error) {
      alert('error')
    }
  }

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      marginRight="2em"
      mt={"1em"}
    >
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {spacecraft.name}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {spacecraft.speed}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {spacecraft.mass}
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span"  fontSize="sm">
            {new Date(spacecraft.createdAt).toLocaleDateString()}
          </Box>
        </Box>
        <Link to={`/spacecraft/edit/${spacecraft.id}`} >
          <Button colorScheme="green" marginTop="2em" size={"sm"} mr="1em">
            Edit Spacecraft
          </Button>
        </Link>
        <Button colorScheme="red" marginTop="2em" size={"sm"} onClick={onDeleteClick}>
          Delete Spacecraft
        </Button>
      </Box>
    </Box>
  );
}

export default SpacecraftCard;
