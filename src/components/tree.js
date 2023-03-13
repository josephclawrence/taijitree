import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby'
import get from 'lodash/get';

import PlayerCard from '../components/player-card';
import { FamDiagram } from 'basicprimitivesreact';
import { PageFitMode, Enabled, Size, Colors, AnnotationType } from 'basicprimitives';

// const colours = {
//     red: '#E63946',
//     light: '#F1FAEE',
//     lightBlue: '#A8DADC',
//     midBlue: '#457B9D',
//     darkBlue: '#1D3557',
// };

// const family = {
//     yang: '#AE2012',
//     chen: '#0A9396',
//     wu: '#CA6702',
//     sun: '#94D2BD',
//     hao: '#EE9B00',
//     li: '#E9D8A6',
//     zhaobao: '#001219',
// };

  
function Tree(props) {
    const { items, options } = props;    
    const [height, setHeight] = useState(900);
    
    let allParents = [];

    const sharedStyleChecker = (list1, list2) => list1.filter( a => list2.some( b => a.slug === b.slug ) );

    function getAllParents(id, parentArray, styles, itemTitleColor) {
        if (!parentArray || parentArray.length === 0) return;
        parentArray.forEach((parent, idx) => {
            console.log(parent, styles);
            const sharedStyles = sharedStyleChecker(parent.styles, styles);
            config.annotations.push({
                items: [id, parent.id],
                annotationType: AnnotationType.HighlightPath,
                lineWidth: 6,
                opacity: 0.3,
                showArrows: false,
                color: sharedStyles.length ? sharedStyles[0].colour.value : parent.styles[0].colour.value,
                offset: {
                    top: 6,
                    bottom: 6,
                    left: 0,
                    right: 0,
                }
            });
        })
        
        // config.annotations.push({
        //     items: [id, ...parentArray],
        //     annotationType: AnnotationType.HighlightPath,
        //     lineWidth: 12,
        //     opacity: 0.3,
        //     showArrows: false,
        //     color: itemTitleColor,
        // });

        const parents = items.filter(item => parentArray.map(parent => parent.id).includes(item.id));

        parents.forEach((parent, idx) => {
            console.log(parent);
            getAllParents(parent.id, parent.parentsStyles, parent.styles, itemTitleColor);
        });
        
        // // const parents = [];
        // console.log(parents);
        // console.log(parentArray);    
        // const players = items.filter(item => parentArray.includes(item.id));
        // console.log('players', players);
        // if (!players || players.length === 0) return;
        // parents.push( ...players.map(player => player.id) );
        // const flatParents = [...new Set(players.map(player => player.parents).flat())];
        // parents.push( ...flatParents );
        // console.log('parents', parents);
        // console.log('flatParents', flatParents);
        // const nextParents = items.filter(item => flatParents?.includes(item.id))?.map(player => player.parents).flat();
        // console.log('nextParents', nextParents);
        // if ( nextParents.length === 0 ) {
        //     allParents = [...new Set(parents)];
        //     return;
        // }
        // getAllParents(parents, nextParents);
    };

    function onCursorChanged(event, data) {
        console.log('onCursorChanged');
        console.log(data);
        const { id, itemTitleColor, styles } = data.context;
        console.log(id, data.context.parentsStyles);
        var children = items
          .filter(item => item.parents?.includes(id))
          .map(player => player.id);
        console.log(children);
        
        // parents.push( items.find(item => item.id === parent).parent );        
        config.annotations = [];
        config.annotations.push({
            items: [id, ...children],
            annotationType: AnnotationType.HighlightPath,
            lineWidth: 6,
            opacity: 0.3,
            showArrows: false,
            color: itemTitleColor,
            offset: {
                top: 6,
                bottom: 6,
                left: 0,
                right: 0,
            }
        });

        getAllParents(id, data.context.parentsStyles, styles, itemTitleColor);
        console.log(allParents);
            // config.annotations[0].items = [id, ...children, ...allParents];
            // config.annotations[0].color = itemTitleColor;
        setConfig(config);
    };

    useEffect(() => {
        const treeElement = document.getElementById("taijiTreeDiagram");
        console.log('treeElement', treeElement);
        const svg = treeElement.querySelector("svg");
        if (svg) {
            const heightnow = svg.getAttribute("height");
            setHeight(heightnow);
        }
    });

    useEffect(() => {
        config.items = items;
        setConfig(config);
    }, [items]);

    const [config, setConfig] = useState({
            pageFitMode: PageFitMode.SelectionOnly,
            hasSelectorCheckbox: Enabled.False, 
            // autoSizeMinimum: new Size(1024, 768),
            defaultTemplateName: "lg",
            cursorItem: 2,
            linesWidth: 3,
            horizontalAlignment: "Left",
            linesColor: "#bbbbbb",
            normalLevelShift: 40,
            dotLevelShift: 10,
            lineLevelShift: 50,
            normalItemsInterval: 10,
            dotItemsInterval: 10,
            lineItemsInterval: 10,
            highlightItem: 1,
            minimumVisibleLevels: 3,
            elbowDotSize: 4,
            bevelSize: 4,
            // highlightLinesWidth: 6,
            // highlightLinesColor: "#ff0000",
            showNeigboursConnectorsHighlighted: true,
            neighboursSelectionMode: 0,
            enableMatrixLayout: true,
            maximumColumnsInMatrix: 4,
            selectionPathMode: 1,
            navigationMode: 0,
            templates: [{
                name: "lg",
                itemSize: new Size(180, 280),
                minimizedItemSize: new Size(10, 10),
                // highlightPadding: { left: 0, top: 0, right: 0, bottom: 0 },
                // highlightBorderWidth: 0,
                cursorPadding: { left: 0, top: 0, right: 20, bottom: 10 },
                cursorBorderWidth: 0,
                cursorBorderStyle: "solid",
                cursorTemplate: () => {
                    return <h2>ping</h2>
                },
                onCursorRender: ({ context: player }) => {
                    // console.log(player);
                    return <div className="CursorFrame" style={{ borderRadius: '8px', position: 'relative', top: '-10px', left: '-10px', opacity: '0.3', borderStyle: 'solid', borderWidth: '10px', borderColor: player.itemTitleColor, height: '298px' }}></div>;
                },
                onItemRender: ({ context: player }) => {
                    return <PlayerCard player={player} size="lg" />;
                },
                onHighlightRender: ({ context: player }) => {
                    // console.log(player);
                    // return <div className="HighlightFrame" style={{ position: 'relative', top: '-10px', left: '-10px', height: '100%', borderStyle: 'solid', borderWidth: '10px', borderColor: player.itemTitleColor }}></div>;
                    return
                },
                
            },
            {
                name: "sm",
                itemSize: new Size(120, 200),
                minimizedItemSize: new Size(10, 10),
                // highlightPadding: { left: 0, top: 0, right: 0, bottom: 0 },
                // highlightBorderWidth: 0,
                cursorPadding: { left: 0, top: 0, right: 20, bottom: 10 },
                cursorBorderWidth: 0,
                cursorBorderStyle: "solid",
                cursorTemplate: () => {
                    return <h2>ping</h2>
                },
                onCursorRender: ({ context: player }) => {
                    // console.log(player);
                    return <div className="CursorFrame" style={{ borderRadius: '8px', position: 'relative', top: '-10px', left: '-10px', opacity: '0.3', borderStyle: 'solid', borderWidth: '10px', borderColor: player.itemTitleColor, height: '218px' }}></div>;
                },
                onItemRender: ({ context: player }) => {
                    return <PlayerCard player={player} size="sm" />;
                },
                onHighlightRender: ({ context: player }) => {
                    // console.log(player);
                    // return <div className="HighlightFrame" style={{ position: 'relative', top: '-10px', left: '-10px', height: '100%', borderStyle: 'solid', borderWidth: '10px', borderColor: player.itemTitleColor }}></div>;
                    return
                },
                
            },
            {
                name: "xs",
                itemSize: new Size(90, 150),
                minimizedItemSize: new Size(10, 10),
                // highlightPadding: { left: 0, top: 0, right: 0, bottom: 0 },
                // highlightBorderWidth: 0,
                cursorPadding: { left: 0, top: 0, right: 12, bottom: 16 },
                cursorBorderWidth: 0,
                cursorBorderStyle: "solid",
                cursorTemplate: () => {
                    return <h2>ping</h2>
                },
                onCursorRender: ({ context: player }) => {
                    // console.log(player);
                    return <div className="CursorFrame" style={{ borderRadius: '8px', position: 'relative', top: '-6px', left: '-6px', opacity: '0.3', borderStyle: 'solid', borderWidth: '6px', borderColor: player.itemTitleColor, height: '157px' }}></div>;
                },
                onItemRender: ({ context: player }) => {
                    return <PlayerCard player={player} size="xs" />;
                },
                onHighlightRender: ({ context: player }) => {
                    // console.log(player);
                    // return <div className="HighlightFrame" style={{ position: 'relative', top: '-10px', left: '-10px', height: '100%', borderStyle: 'solid', borderWidth: '10px', borderColor: player.itemTitleColor }}></div>;
                    return
                },
                
            }],
            items: items,
            annotations: [],
            onGroupTitleRender: ({context: player, height}) => {
                console.log(player, height);
                return <div style={{ fontSize: '12px', borderRadius: '10px', height: height-10, background: player.itemTitleColor || "pink" }}><div style={{ width: height-10, transform: `rotate(90deg) translate(${height/2}px, ${height/2-15}px)`, color: '#fff'}}>{player.generation}</div></div>
                // config.groupTitleColor = player.itemTitleColor;
                // setConfig(config);
                // return <div className="CursorFrame" style={{ position: 'relative', top: '-10px', left: '-10px', opacity: '0.3', borderStyle: 'solid', borderWidth: '10px', borderColor: player.itemTitleColor, height: '100%' }}></div>;
            },
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
            },
            ...options
    });
  
    return (
        <div style={{ height: height + "px" }} id="taijiTreeDiagram">
            <FamDiagram 
                centerOnCursor={false} 
                config={config} 
                onCursorChanged={config.onCursorChanged}
                onHighlightChanged={config.onHighlightChanged}
                onSelectionChanged={config.onSelectionChanged}
                onItemRender={config.onItemRender}
            />
        </div>
    );
    
}

export default Tree;
