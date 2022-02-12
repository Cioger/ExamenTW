import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";

function AstronautCard({ astronaut, setAstronautList, canEdit }) {
  const onDeleteClick = async () => {
    try {
      const response = await remove(`/astronaut/${astronaut.id}`);
      if (response.status == 200) {
        if (setAstronautList) {
          setAstronautList((oldAstronauts) => {
            const newAstronauts = oldAstronauts.filter((a) => a.id != astronaut.id);
            return newAstronauts;
          });
        }
      }
    } catch (error) {
      alert("error");
    }
  };

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
        <Box display="flex" alignItems="baseline">
          
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {astronaut.name}
        </Box>
        <Box
          mt="1"
          lineHeight="tight"
          isTruncated
        >
          {astronaut.role}
        </Box>
        {canEdit && (
          <Box>
            <Link to={`/astronaut/edit/${astronaut.id}`}>
              <Button colorScheme="green" marginTop="2em" size={"sm"} mr="1em">
                Edit astronaut
              </Button>
            </Link>
            <Button
              colorScheme="red"
              marginTop="2em"
              size={"sm"}
              onClick={onDeleteClick}
            >
              Delete astronaut
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AstronautCard;
