import React, { useState } from 'react';
import { Link, graphql } from 'gatsby'
import get from 'lodash/get';

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import Layout from '../components/layout';
import Tree from '../components/tree';
import TreeMenu from '../components/tree-menu';

import { family } from '../components/constants';
  
function MainTree(props) {

    const noFilter = (x) => x;
    const players = get(props, 'data.allContentfulPlayer.nodes');
    const styles = get(props, 'data.allContentfulStyle.nodes');
    console.log(players);
    console.log(styles);
    const origItems = players.map((player) => {
      const plainTextDescription = documentToPlainTextString(
          JSON.parse(player.shortBio && player.shortBio !== null && player.shortBio !== undefined ? player.shortBio?.raw : null)
      );
      return {
          id: player.id,
          // parent: player.parents && player.parents.length ? player.parents[0].id : null,
          parents: player.parents && player.parents.length ? player.parents.map(player => player.id) : null,
          parentsStyles: player.parents && player.parents.length ? player.parents.map(player => { return { id: player.id, styles: player.styles } }) : null,
          slug: player.slug,
          name: player.name,
          birthYear: player.birthYear,
          deathYear: player.deathYear,
          chineseName: player.chineseName,
          generation: player.generation,
          // groupTitle: player.generation,
          styles: player.styles,
          associatedStyles: player.associatedStyles,
          description: plainTextDescription,
          // image: player.mainImage ? player.mainImage.gatsbyImage.images.fallback.src : null,
          mainImage: player.mainImage,
          family: player.className,
          itemTitleColor: player.styles && player.styles[0]?.colour?.value,
      }
    });
    const [items, setItems] = useState(origItems);
    
    const resetItems = () => {
      setItems(origItems);
    }

    const colours = {
      red: '#E63946',
      light: '#F1FAEE',
      lightBlue: '#A8DADC',
      midBlue: '#457B9D',
      darkBlue: '#1D3557',
    };
    
    // const family = {
    //     "main-yang": '#AE2012',
    //     yang: '#AE2012',
    //     chen: '#0A9396',
    //     wu: '#CA6702',
    //     sun: '#94D2BD',
    //     hao: '#EE9B00',
    //     "wu-hao": '#EE9B00',
    //     li: '#E9D8A6',
    //     zhaobao: '#001219',
    // };
    

    return (
        <Layout location={props.location}>
          <TreeMenu origItems={origItems} styles={styles} items={items} setItems={setItems} resetItems={resetItems} />
          <Tree items={items} options={{ defaultTemplateName: "xs" }} />
            {/* <pre>{items && JSON.stringify(items, null, 2)}</pre>
            <pre>{players && JSON.stringify(players, null, 2)}</pre> */}
        </Layout>
    );
    
}

export default MainTree;

export const pageQuery = graphql`
  query PlayerTreeQuery {
    allContentfulPlayer(sort: { fields: [name], order: DESC }) {
      nodes {
        id
        name
        chineseName
        slug
        associatedStyles
        className
        generation
        mainTeacher {
            id
            name
            slug
        }
        parents {
            id
            name
            slug
            styles {
              name
              slug
              colour {
                value
              }
            }
        }
        styles {
          name
          slug
          colour {
            value
          }
        }
        tags
        birthYear
        deathYear
        mainImage {
            gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 128)
            resize(height: 130) {
                src
            }
        }
        shortBio {
          raw 
        }
      }
    }
    allContentfulStyle(sort: { fields: [name], order: DESC }) {
      nodes {
        id
        name        
        slug
        colour {
            value
        }
      }
    }
  }
`