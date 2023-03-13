import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Seo from '../components/seo';
import Layout from '../components/layout';
import Hero from '../components/hero';
import Topbar from '../components/topbar';
import PlayerSidebar from '../components/player-sidebar';
import PlayerTree from '../components/player-tree';
import Tags from '../components/tags';
import PlayerCard from '../components/player-card';
import * as styles from './blog-post.module.css';
// import './player.module.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MaterialLink from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';

import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import YoutubeEmbed from '../components/youtube-embed';
import ImageGallery from '../components/image-gallery';
import LinkCard from '../components/link-card';

import { family } from '../components/constants';

function getMeta(url) {
  fetch('/api/getMeta?url=' + url)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json()
      } else {
        throw Error(response.message)
      }
    })
    .then((response) => {
      // Save response in state hook
      console.log(response);
      return <LinkCard linkData={response.data} />

    })
    .catch((error) => {
      // Handle the error
    })
}

function PlayerTemplate(props) {
  const player = get(props, 'data.contentfulPlayer');

  const parents = get(props, 'data.parents').nodes;
  const students = get(props, 'data.students').nodes;

  // console.log("stuents: ", students);
  const plainTextDescription = documentToPlainTextString(
    JSON.parse(player.shortBio && player.shortBio !== null && player.shortBio !== undefined ? player.shortBio?.raw : null)
  );

  // useEffect(() => {
  //   fetch('/api/getMeta')
  //     .then((response) => {
  //       if (response.status >= 200 && response.status <= 299) {
  //         return response.json()
  //       } else {
  //         throw Error(response.message)
  //       }
  //     })
  //     .then((response) => {
  //       // Save response in state hook
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       // Handle the error
  //     })
  // }, []);
  
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { gatsbyImage, description } = node.data.target
      return (
          <GatsbyImage
            image={getImage(gatsbyImage)}
            alt={description}
          />
        )
      },
    },
  };

  return (
    <Layout location={props.location}>
      <Seo
        title={player.name}
        description={plainTextDescription}
        image={`http:${player.mainImage?.resize.src}`}
      />
      
      <Hero
        image={player.mainImage?.gatsbyImage}
        name={player.name}
        content={player.shortBio}
        chineseName={player.chineseName}
        birthYear={player.birthYear}
        deathYear={player.deathYear}
        generation={player.generation}
        associatedStyles={player.styles}
      />
      <Grid container sx={{ position: "relative", top: "50px", borderTop: "1px solid #eee" }}>
        <Grid item sm={3} md={2} sx={{ paddingTop: "35px", borderRight: "1px solid #eee" }}>
          <PlayerSidebar 
            gallery={player.gallery && player.gallery.length > 0}
            videos={player.videos && player.videos.length > 0}
            wikipedia={player.wikipediaUrl}
            socialMediaProfiles={player.socialMediaProfiles}
            websites={player.websites}
            links={player.links}
          />
        </Grid>
        <Grid item sm={6} md={7} sx={{ paddingTop: "35px", borderRight: "1px solid #eee" }}>
          <Container maxWidth="xl" >
            <div className={styles.container}>
              <div className={styles.article} id="MainBio">
                <div className={styles.body}>
                  {player.longBio?.raw && renderRichText(player.longBio, options)}
                </div>
                
              </div>
            </div>
            { player.gallery && 
              <Box id="PlayerGallery">
                <h4>Images</h4>
                <ImageGallery images={player.gallery} />
              </Box>
            }
            { player.videos && 
              <Box id="PlayerVideos">
                <h4>Videos</h4>
                <Carousel>
                  { player.videos.map( (video, i) => <YoutubeEmbed key={`playervideos_${i}`} url={video} /> ) }
                </Carousel>
              </Box>
            }
            { player.links && 
              <Box id="PlayerLinks">
                <h4>Links</h4>
                <Grid container spacing={2}>
                { player.links && player.links.map((link, i) => (
                  <Grid item sm={3} md={4}>
                    <LinkCard key={`playerlink_${i}`} url={link} /> 
                  </Grid>
                )) }
                </Grid>
              </Box>
            }
            { player.references && 
              <>
              <h4>References</h4>
              { player.references && player.references.map((reference, idx) => (
                <p key={`reference_${idx}`}>
                  <MaterialLink
                    target="_blank" 
                    rel="noopener"
                    href={reference}>
                      {reference}
                  </MaterialLink>                
                </p>
                ))}
              </>
            }
          </Container>
        </Grid>
        <Grid item sm={3} sx={{ paddingTop: "35px" }}>
            <Typography variant="h6" component="h6" align="center">
              Teachers & students
            </Typography>
           <PlayerTree items={[...parents, ...students, player]}  />          
        </Grid>
      </Grid>
      
    </Layout>
  );
}

export default PlayerTemplate

export const pageQuery = graphql`
  query PlayerBySlug(
    $slug: String!
    $parentsOfCurrent: [String]
    $studentsOfCurrent: [String]
  ) {
    contentfulPlayer(slug: { eq: $slug }) {
      id
      slug
      name
      associatedStyles
      styles {
        name
        slug
        colour {
          value
        }
      }
      chineseName
      otherNames
      socialMediaProfiles
      className
      generation
      gallery {
        title
        filename
        url
        width
        height
      }
      videos
      birthYear
      deathYear
      mainImage {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      longBio {
        raw
      }      
      shortBio {
        raw
      }
      wikipediaUrl
      websites
      references
      links
      parents {
        id
        name
        slug
      }
      students {
        id
        name
        slug
      }
    }
    parents: allContentfulPlayer(filter: { slug: { in: $parentsOfCurrent }}) {
      nodes {
        id
        name
        slug
        mainImage {
          gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 128)
          resize(height: 130) {
            src
          }
        }
        chineseName
        className
        generation
        birthYear
        deathYear
        styles {
          name
          slug
          colour {
            value
          }
        }
        parents {
          id
          name
          slug
        }
        students {
          id
          name
          slug
        }
      }
    }
    students: allContentfulPlayer(filter: { slug: { in: $studentsOfCurrent }}) {
      nodes {
        id
        name
        slug
        mainImage {
          gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 128)
          resize(height: 130) {
            src
          }
        }
        chineseName
        className
        generation
        birthYear
        deathYear
        styles {
          name
          slug
          colour {
            value
          }
        }
        parents {
          id
          name
          slug
        }
        students {
          id
          name
          slug
        }
      }
    }
    # previous: contentfulPlayer(slug: { eq: $previousPlayerSlug }) {
    #   slug
    #   name
    # }
    # next: contentfulPlayer(slug: { eq: $nextPlayerSlug }) {
    #   slug
    #   name
    # }
  }
`;

