import React from "react";

import TimesTables from "./TimesTables";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function App() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
      width="100%"
      paddingLeft="8px"
      paddingRight="8px"
    >
      <Typography variant="h1">Olá!</Typography>
      <Typography variant="h5">É hora de aprender tabuada!</Typography>
      <TimesTables base={2} numQuestions={4} />
    </Box>
  );
}
