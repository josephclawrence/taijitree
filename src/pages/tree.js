import React from 'react';
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Layout from '../components/layout'
import { OrgDiagram } from 'basicprimitivesreact';
import { PageFitMode, Enabled, Size, Colors } from 'basicprimitives';

const colours = {
    red: '#E63946',
    light: '#F1FAEE',
    lightBlue: '#A8DADC',
    midBlue: '#457B9D',
    darkBlue: '#1D3557',
};

const family = {
    yang: '#AE2012',
    chen: '#0A9396',
    wu: '#CA6702',
    sun: '#94D2BD',
    hao: '#EE9B00',
    li: '#E9D8A6',
    zhaobao: '#001219',
};

class Tree extends React.Component {

    render() {
        const players = get(this, 'props.data.allContentfulPlayer.nodes');
        const items = players.map((player) => {
            const plainTextDescription = documentToPlainTextString(
                JSON.parse(player.shortBio && player.shortBio !== null && player.shortBio !== undefined ? player.shortBio?.raw : null)
            )
            return {
                id: player.id,
                parent: player.parents && player.parents.length ? player.parents[0].id : null,
                slug: player.slug,
                name: player.name,
                birthYear: player.birthYear,
                deathYear: player.deathYear,
                chineseName: player.chineseName,
                generation: player.generation,
                groupTitle: player.generation,
                description: plainTextDescription,
                image: player.mainImage ? player.mainImage.gatsbyImage.images.fallback.src : null,
                family: player.className,
                itemTitleColor: family[player.className],
            }
        });
        const config = {
            pageFitMode: PageFitMode.SelectionOnly,
            hasSelectorCheckbox: Enabled.False, 
            // autoSizeMinimum: new Size(1024, 768),
            defaultTemplateName: "taijiTreeTemplate",
            cursorItem: 2,
            linesWidth: 1,
            linesColor: "black",
            normalLevelShift: 20,
            dotLevelShift: 20,
            lineLevelShift: 20,
            normalItemsInterval: 10,
            dotItemsInterval: 10,
            lineItemsInterval: 10,
            highlightItem: 1,
            // highlightLinesWidth: 6,
            // highlightLinesColor: "#ff0000",
            showNeigboursConnectorsHighlighted: true,
            neighboursSelectionMode: 1,
            enableMatrixLayout: true,
            maximumColumnsInMatrix: 4,
            selectionPathMode: 1,
            navigationMode: 0,
            templates: [{
                name: "taijiTreeTemplate",
                itemSize: new Size(180, 220),
                minimizedItemSize: new Size(15, 15),
                highlightPadding: { left: 4, top: 4, right: 4, bottom: 4 },
                highlightBorderWidth: 8,
                cursorPadding: { left: 3, top: 3, right: 3, bottom: 3 },
                cursorBorderWidth: 10,
                onCursorRender: ({ context: itemConfig }) => {
                    return <div className="CursorFrame" style={{ borderStyle: 'solid', borderWidth: '10px', borderColor: colours.darkBlue, height: '100%' }}>
                    <div className="CursorBadge" style={{ backgroundColor: colours.darkBlue }}>ping</div>
                    </div>;
                },
                onItemRender: ({ context: itemConfig }) => {
                    return <div className=" bp-item bp-corner-all bt-item-frame" style={{ backgroundColor: colours.light, textAlign: 'center' }}>
                    <div className=" bp-item bp-corner-all bp-title-frame" style={{ height: '50px', overflow: 'hidden', backgroundColor: colours.midBlue, padding: '5px' }}>
                        <div className=" bp-item bp-title" style={{ height: '18px', fontSize: '14px', overflow: 'hidden', color: colours.light }}>{itemConfig.name}
                        </div>
                        <div className=" bp-item bp-title" style={{ height: '18px', fontSize: '14px', overflow: 'hidden', color: colours.light }}>{itemConfig.chineseName}</div>
                    </div>
                    <div className=" bp-item bp-photo-frame" style={{ width: '100%', height: '100px', overflow: 'hidden', background: 'black' }}>
                        <div className=" bp-item bp-photo-frame" style={{ margin: '0 auto', height: '100px', overflow: 'hidden', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', boxShadow: 'rgb(0 0 0) 1px 1px 4px 5px inset', backgroundImage: `url(${itemConfig.image})` }}>
                        
                        </div>
                    </div>
                    <div className=" bp-item" style={{ height: '18px', fontSize: '12px', overflow: 'hidden' }}>
                        {(itemConfig.birthYear || itemConfig.deathYear) ? ((itemConfig.birthYear || 'unknown') + ' - ' + (itemConfig.deathYear || 'unknown')) : 'Birth and death unknown'}
                    </div>
                    <div className=" bp-item" style={{ height: '18px', fontSize: '12px', overflow: 'hidden' }}></div>
                    {/* <div className=" bp-item" style={{ height: '36px', fontSize: '10px', overflow: 'hidden' }}>{itemConfig.generation}</div> */}
                    <div className=" bp-item" style={{ height: '20px', fontSize: '14px', textAlign: 'center', overflow: 'hidden' }}>
                        <a href={itemConfig.image}>View &#8594;</a>
                    </div>
                </div>;
                },
                onHighlightRender: ({ context: itemConfig }) => {
                    return <div className="HighlightFrame" style={{ height: '100%', borderStyle: 'solid', borderWidth: '10px', borderColor: colours.red }}>
                    <div className="HighlightBadgePlaceholder">
                        <div className="HighlightBadge" style={{ backgroundColor: colours.darkBlue }}>
                        {itemConfig.chineseName}
                        </div>
                    </div>
                    </div>;
                }
            }],
            items: items,
            onCursorChanged,
            onHighlightChanged: function(event, data) {
                // console.log('onHighlightChanged');
                // console.log(event);
                // console.log(data);
            },
            onSelectionChanged: function(event, data) {
                console.log('onSelectionChanged');
                console.log(event);
                console.log(data);
            },
            onItemRender: function(event, data) {
                console.log('onItemRender');
                console.log(event);
                console.log(data);
            }
        };
  
      return (
        <Layout location={this.props.location}>
            <OrgDiagram 
                centerOnCursor={false} 
                config={config} 
                style={{ height: '900px' }} 
                onCursorChanged={config.onCursorChanged}
                onHighlightChanged={config.onHighlightChanged}
                onSelectionChanged={config.onSelectionChanged}
                onItemRender={config.onItemRender}
            />
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