import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import * as styles from './hero.module.css'

const Hero = ({ image, name, content, chineseName, birthYear, deathYear, associatedStyles, generation }) => (
  <>
    <Box
      sx={{
        // width: 300,
        height: 300,
        background: 'url(/bamboo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',  
        borderRadius: '8px'   
      }}
    />
    <Grid container sx={{ position: 'relative', top: '-100px'}}>
        <Grid item sm={3}>
        {image && (
          <GatsbyImage className={styles.image} alt={name} image={image} />
        )}
        </Grid>
        <Grid item sm={9}>
          <Box sx={{ position: 'relative', top: '100px'}}>
            <Typography variant="h2" component="h2">
              {name}
            </Typography>
            <Typography variant="h3" component="h3">
              {chineseName}
            </Typography>
            <Typography variant="h5" component="h5">
              {(birthYear || deathYear) ? ((birthYear || 'unknown') + ' - ' + (deathYear || 'unknown')) : 'Birth and death unknown'}
            </Typography>
            <Typography variant="h5" component="h5">
              {generation}
            </Typography>
            { associatedStyles && associatedStyles.length && 
              associatedStyles.map((style, idx) => (
                <Chip key={`style_${idx}`} size="small" label={style.name} sx={{ marginRight: "5px", color: "#ffffff", background: style.colour?.value }} />
              ))
              
            }            
          </Box>
        </Grid>
    </Grid>
  </>
)

export default Hero;