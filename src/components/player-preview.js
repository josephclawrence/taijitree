import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ players }) => {
  if (!players) return null
  if (!Array.isArray(players)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {players.map((player) => {
          return (
            <li key={player.slug}>
              <Link to={`/players/${player.slug}`} className={styles.link}>
                <GatsbyImage alt="" image={player.mainImage.gatsbyImage} />
                <h2 className={styles.title}>{player.name}</h2>
              </Link>
              <div>
                {player.shortBio?.raw && renderRichText(player.shortBio)}
              </div>
              <div className={styles.meta}>
                <small className="meta">{}</small>
                <Tags tags={player.associatedStyles} />
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlePreview