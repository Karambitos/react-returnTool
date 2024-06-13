import React, {Suspense} from 'react';
import { Return } from "../components";
import {Box, Container} from "@mui/material";

const Home = () => {
  return (
      <Container>
          <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
              <Suspense fallback={<div>Loading...</div>}>
                  <Return/>
              </Suspense>
          </Box>
      </Container>
  );
};

export default Home;