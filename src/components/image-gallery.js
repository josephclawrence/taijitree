import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import 'photoswipe/dist/photoswipe.css';

import { Gallery, Item, useGallery } from 'react-photoswipe-gallery';

function ImageGallery(props) {
    const { images } = props;
    const { open } = useGallery()

    useEffect(() => {
        open(1) // you can open second slide by calling open(1) in useEffect
    }, [open])

    return (
        <Gallery>
          <ImageList variant="masonry" cols={3} gap={8}>
            {images.map((item, idx) => (
              <ImageListItem 
                key={`image_${idx}`}
                onClick={() => open(idx)}
              >

                <Item
                  original={item.url}
                  thumbnail={item.url}
                  width={item.width}
                  height={item.height}
                  key={`image_${idx}`}
                >
                  {({ ref, open }) => (
                    <img ref={ref} onClick={open} src={item.url} style={{ width: "100%", cursor: "pointer" }} />
                  )}
                </Item>
              </ImageListItem>              
            ))}
          </ImageList>
        </Gallery>
      );
}

export default ImageGallery;