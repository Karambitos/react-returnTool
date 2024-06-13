import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Box } from '@mui/material';

export default function Layout() {
  return (

      <Container>
          <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
          </Suspense>
      </Container>
  );
}
