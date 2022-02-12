import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import SpacecraftCard from "./SpacecraftCard";

function SpacecraftList({ spacecraftList, setSpacecraftList, name }) {
  return (
    <Box>
      <Grid templateColumns="repeat(3,1fr)">
        {spacecraftList.map((s) => {
          if (s.name.includes(name))
            return <SpacecraftCard
              spacecraft={s}
              key={s.id}
              setSpacecraftList={setSpacecraftList}
            />;
        })}
      </Grid>
    </Box>
  );
}

export default SpacecraftList;
