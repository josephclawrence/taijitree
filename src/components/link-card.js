import React, { useEffect, useState } from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = makeStyles({
    cardImage: {
      '&.MuiCardMedia-img': {
        objectFit: 'cover'
      }
    },
    cardBody: {
        '&.MuiCardContent-root': {
            padding: '5px 10px',
            textAlign: 'center'
        }
    },
    cardTotal: {
        '&:hover': {
            background: '#f3f8ff'
        }
    }
});

function LinkCard(props) {
    const { url } = props;
    console.log(url);
    const classes = useStyles();
    const [response, setResponse] = useState({ data: null });

    useEffect(() => {
        fetch('/api/getMeta?url=' + url)
            .then((response) => response.json())
            .then((response) => {

                setResponse({ data: response.data });
                console.log('response', response);
            })
            .catch((error) => {
            // Handle the error
            })
    }, [])
    return (
        <Card sx={{ maxWidth: 345 }} variant="outlined">
            <CardMedia
                sx={{ height: 140 }}
                image={response.data?.image || null}
                title={response.data?.title}
            />
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    {response.data?.provider}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ lineHeight: "1.2" }}>
                    {response.data?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${response.data?.description?.substring(0, 140)}...`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={response.data?.url} target="_blank" rel="noopener" sx={{ width: "100%"}} size="small">Visit</Button>
            </CardActions>
        </Card>
    );
}

export default LinkCard;