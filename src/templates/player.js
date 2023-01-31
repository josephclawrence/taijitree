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
    const player = get(this.props, 'data.contentfulPlayer')
    // const previous = get(this.props, 'data.previous')
    // const next = get(this.props, 'data.next')
    const parents = get(this.props, 'data.parents')
    const students = get(this.props, 'data.students')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(player.shortBio && player.shortBio !== null && player.shortBio !== undefined ? player.shortBio?.raw : null)
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
          title={player.name}
          description={plainTextDescription}
          image={`http:${player.mainImage?.resize.src}`}
        />
        <Hero
          image={player.mainImage?.gatsbyImage}
          title={player.name}
          content={player.shortBio}
        />
        <div className={styles.container}>
            <p className={styles.meta}>
            {player.chineseName}
          </p>
          <span className={styles.meta}>
            {player.birthYear} - {player.deathYear}
          </span>
          
          <div className={styles.article}>
            <div className={styles.body}>
              {player.longBio?.raw && renderRichText(player.longBio, options)}
            </div>
            <Tags tags={player.associatedStyles} />
            <p>Parent</p>
            {player.parents && player.parents.map((parent) => {
              return (
                <Link to={`/players/${parent.slug}`} className={styles.link}>
                  <h2 className={styles.title}>{parent.name}</h2>
                </Link>
              )
            })}

            {parents && parents.map((parent) => {
              return (
                <Link to={`/players/${parent.slug}`} className={styles.link}>
                  <h2 className={styles.title}>{parent.name}</h2>
                  <h4 className={styles.title}>{parent.chineseName}</h4>
                  {parent.birthYear} - {parent.deathYear}
                </Link>
              )
            })}

            <p>Students</p>
            {player.students && player.students.map((student) => {
              return (
                <Link to={`/players/${student.slug}`} className={styles.link}>
                  <h2 className={styles.title}>{student.name}</h2>
                </Link>
              )
            })}

            {students && students.map((student) => {
              return (
                <Link to={`/players/${student.slug}`} className={styles.link}>
                  <h2 className={styles.title}>{student.name}</h2>
                  <h4 className={styles.title}>{student.chineseName}</h4>
                  {student.birthYear} - {student.deathYear}
                </Link>
              )
            })}
            {/* {(previous || next) && (
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
            )} */}
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
    $previousPlayerSlug: String
    $nextPlayerSlug: String
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
      parents {
        name
        slug
      }
      students {
        name
        slug
      }
    }
    parents: allContentfulPlayer(filter: { slug: { in: $parentsOfCurrent }}) {
      nodes {
        name
        slug
        mainImage {
          gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
          resize(height: 630, width: 1200) {
            src
          }
        }
        chineseName
        birthYear
        deathYear
      }
    }
    students: allContentfulPlayer(filter: { slug: { in: $studentsOfCurrent }}) {
      nodes {
        name
        slug
        mainImage {
          gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
          resize(height: 630, width: 1200) {
            src
          }
        }
        chineseName
        birthYear
        deathYear
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

