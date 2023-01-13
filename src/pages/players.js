import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import PlayerPreview from '../components/player-preview'

class PlayerIndex extends React.Component {
  render() {
    const players = get(this, 'props.data.allContentfulPlayer.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="Player" />
        <Hero title="Player" />
        <PlayerPreview players={players} />
      </Layout>
    )
  }
}

export default PlayerIndex

export const pageQuery = graphql`
  query PlayerIndexQuery {
    allContentfulPlayer(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        name
        slug
        tags
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
