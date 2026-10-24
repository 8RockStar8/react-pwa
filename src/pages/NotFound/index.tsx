import { Link as RouterLink } from 'react-router';

import { Button } from '@mui/material';

import Page from '@/components/Page';

function NotFound() {
  return (
    <Page title="This page doesn't exist" intro="The link may be old or mistyped. Use the menu, or go back to the start.">
      <div>
        <Button component={RouterLink} to="/" variant="contained" disableElevation>
          Go to About
        </Button>
      </div>
    </Page>
  );
}

export default NotFound;
