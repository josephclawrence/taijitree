import React from 'react';
import { Link, graphql } from 'gatsby'
import get from 'lodash/get';

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import Layout from '../components/layout';
import Tree from '../components/tree';

import { ChildrenPlacementType, PageFitMode } from 'basicprimitives';
  
function PlayerTree(props) {
    const colours = {
        red: '#E63946',
        light: '#F1FAEE',
        lightBlue: '#A8DADC',
        midBlue: '#457B9D',
        darkBlue: '#1D3557',
      };
    
    const family = {
        "main-yang": '#AE2012',
        yang: '#AE2012',
        chen: '#0A9396',
        wu: '#CA6702',
        sun: '#94D2BD',
        hao: '#EE9B00',
        "wu-hao": '#EE9B00',
        li: '#E9D8A6',
        zhaobao: '#001219',
    };

    const items = props.items.map((player) => {
        const plainTextDescription = documentToPlainTextString(
            JSON.parse(player.shortBio && player.shortBio !== null && player.shortBio !== undefined ? player.shortBio?.raw : null)
        )
        return {
            id: player.id,
            // parent: player.parents && player.parents.length ? player.parents[0].id : null,
            parents: player.parents && player.parents.length ? player.parents.map(player => player.id) : null,
            slug: player.slug,
            name: player.name,
            birthYear: player.birthYear,
            deathYear: player.deathYear,
            chineseName: player.chineseName,
            generation: player.generation,
            description: plainTextDescription,
            mainImage: player.mainImage,
            family: player.className,
            itemTitleColor: player.styles && player.styles[0]?.colour?.value,
        }
    });

    const options = {
        childrenPlacementType: ChildrenPlacementType.Matrix,
        minimumVisibleLevels: 3,
        maximumColumnsInMatrix: 1,
        annotations: [],
        pageFitMode: PageFitMode.PageWidth,
        defaultTemplateName: "sm",
        minimumMatrixSize: 1
    };

    return (
        <Tree items={items} options={options} height={1600} />
    );
    
}

export default PlayerTree;