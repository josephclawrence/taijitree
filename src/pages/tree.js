import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get'

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Layout from '../components/layout'
import { OrgDiagram } from 'basicprimitivesreact';
import { PageFitMode, Enabled } from 'basicprimitives';

var photos = {
  a: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn' + 
  'QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC' + 
  'RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh' + 
  'ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e' + 
  'ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+' + 
  '0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6' + 
  '5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt' + 
  'iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII='
};

class Tree extends React.Component {

    render() {
        const players = get(this, 'props.data.allContentfulPlayer.nodes')
        const items = players.map((player) => {
            return {
                id: player.id,
                parent: player.parents.length ? player.parents[0].id : null,
                title: player.name,
                description: player.shortBio,
                image: player.mainImage ? player.mainImage.gatsbyImage.images.fallback.src : null,
            }
        });
        const config = {
            pageFitMode: PageFitMode.AutoSize,
            autoSizeMinimum: { width: 100, height: 100 },
            cursorItem: 0,
            highlightItem: 0,
            hasSelectorCheckbox: Enabled.True,
            items: players.map((player) => {
                return {
                    id: player.id,
                    parent: player.parents.length ? player.parents[0].id : null,
                    title: player.name,
                    description: player.shortBio,
                    image: player.mainImage ? player.mainImage.gatsbyImage.images.fallback.src : null,
                }
            }),
            // [
            //   {
            //     id: 0,
            //     parent: null,
            //     title: 'James Smith',
            //     description: 'VP, Public Sector',
            //     image: photos.a
            //   },
            //   {
            //     id: 1,
            //     parent: 0,
            //     title: 'Ted Lucas',
            //     description: 'VP, Human Resources',
            //     image: photos.a
            //   },
            //   {
            //     id: 2,
            //     parent: 0,
            //     title: 'Fritz Stuger',
            //     description: 'Business Solutions, US',
            //     image: photos.a
            //   }
            // ]
        };
  
      return (
        <Layout location={this.props.location}>
            <div className="App">
                <OrgDiagram centerOnCursor={true} config={config} />
            </div>
            <pre>{items && JSON.stringify(items, null, 2)}</pre>
            <pre>{players && JSON.stringify(players, null, 2)}</pre>
        </Layout>
      )
    }
  }

export default Tree;

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
        teachers {
            id
            name
            slug
        }
        parents {
            id
            name
            slug
        }
        tags
        birthYear
        deathYear
        mainImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        shortBio {
          raw 
        }
      }
    }
  }
`