import React from 'react';
import './youtube-embed.module.css';
import { makeStyles } from '@mui/styles';

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

const useStyles = makeStyles({
    videoResponsive: {
        overflow: 'hidden',
        paddingBottom: '56.25%',
        position: 'relative',
        height: 0,
        '& iframe': {
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
            position: 'absolute'
        }
      },
});

const YoutubeEmbed = ({ url }) => {
    const embedId = getId(url);
    const classes = useStyles();
    return (
        <div className={classes.videoResponsive}>
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
}

export default YoutubeEmbed;
