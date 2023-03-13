import React from 'react'

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import * as styles from './footer.module.css'

function Copyright() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        All images and biographical text are either sourced from Wikipedia at the link supplied on each page, or otherwise from a source also attributed either in the 'references' links for each page, or from the personal website referenced on the given page. Please contact us if you have any concerns or disputes about the use of any images or text.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://taijitree.com/">
          TajiTree
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

function Footer(props) {
  const { description, title } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer
