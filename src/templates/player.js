import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

class PlayerTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPlayer')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(post.shortBio && post.shortBio !== null && post.shortBio !== undefined ? post.shortBio?.raw : null)
    )
    
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
      <Layout location={this.props.location}>
        <Seo
          title={post.name}
          description={plainTextDescription}
          image={`http:${post.mainImage?.resize.src}`}
        />
        <Hero
          image={post.mainImage?.gatsbyImage}
          title={post.name}
          content={post.shortBio}
        />
        <div className={styles.container}>
            <p className={styles.meta}>
            {post.chineseName}
          </p>
          <span className={styles.meta}>
            {post.birthYear} - {post.deathYear}
          </span>
          
          <div className={styles.article}>
            <div className={styles.body}>
              {post.longBio?.raw && renderRichText(post.longBio, options)}
            </div>
            <Tags tags={post.associatedStyles} />
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/players/${previous.slug}`} rel="prev">
                        ← {previous.name}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/players/${next.slug}`} rel="next">
                        {next.name} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PlayerTemplate

export const pageQuery = graphql`
  query PlayerBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulPlayer(slug: { eq: $slug }) {
      slug
      name
      associatedStyles
      chineseName
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
    }
    previous: contentfulPlayer(slug: { eq: $previousPostSlug }) {
      slug
      name
    }
    next: contentfulPlayer(slug: { eq: $nextPostSlug }) {
      slug
      name
    }
  }
`
