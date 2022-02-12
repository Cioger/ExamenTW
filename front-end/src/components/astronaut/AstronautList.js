import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import AstronautCard from "./AstronautCard";

function AstronautList({ astronautList, setAstronautList, astronautName, canEdit }) {
  return (
    <Box>
      <Grid templateColumns="repeat(3,1fr)">
        {astronautList.map((a) => {
          if (a.name.includes(astronautName))
            return (
              <AstronautCard
                key={a.id}
                astronaut={a}
                setAstronautList={setAstronautList}
                canEdit={canEdit}
              />
            );
        })}
      </Grid>
    </Box>
  );
}

export default AstronautList;
