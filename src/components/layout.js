import React from 'react';

// import './variables.css';
// import './global.css';
import Seo from './seo';
import Navigation from './navigation';
import Footer from './footer';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from './Header';
// import Main from './Main';
// import Sidebar from './Sidebar';
// import Footer from './Footer';

const theme = createTheme();

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Blog', url: '/blog/' },
  { title: 'Players', url: '/players/' },
  { title: 'Tree', url: '/tree/' },
];

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Seo />
          <Navigation sections={sections} title="TaijiTree" />
          <main>{children}</main>
          <Footer title="TaijiTree" description="Aspiring to be the most extensive and comprehensive record of the transmission of knowledge of taijiquan." />
        </Container>
      </ThemeProvider>
    )
  }
}

export default Template
