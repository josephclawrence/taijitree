const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }


  // Taiji players

  // Define a template for blog post
  const playersTemplate = path.resolve('./src/templates/player.js')
  // console.log(playersTemplate);
  const playerResult = await graphql(
    `
      {
        allContentfulPlayer {
          nodes {
            name
            slug
            parents {
              slug
            }
            students {
              slug
            }
          }
        }
      }
    `
  )

  if (playerResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful players`,
      playerResult.errors
    )
    return
  }

  const players = playerResult.data.allContentfulPlayer.nodes
  // console.log(players);
  // Create blog players pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (players.length > 0) {
    players.forEach((player, index) => {      
      // const previousPlayerSlug = index === 0 ? null : players[index - 1].slug;
      // const nextPlayerSlug = index === players.length - 1 ? null : players[index + 1].slug
      console.log("************", player.parents?.map(parent => parent.slug))
      console.log("************", player.students?.map(student => student.slug))
      createPage({
        path: `/players/${player.slug}/`,
        component: playersTemplate,
        context: {
          slug: player.slug,
          // previousPlayerSlug,
          // nextPlayerSlug,
          parentsOfCurrent: player.parents ? player.parents.map(parent => parent.slug) : [],
          studentsOfCurrent: player.students ? player.students.map(student => student.slug) : [],
        },
      })
    })
  }
}
