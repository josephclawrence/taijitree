import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
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
            padding: '5px 5px 3px',
            textAlign: 'center'
        }
    },
    cardTotal: {
        '&:hover': {
            background: '#fcfdff'
        }
    }
});

function PlayerCard(props) {
    const { player, size } = props;
    const classes = useStyles();
    return (
        <Card 
            variant="outlined"
            className={classes.cardTotal}
        >
            <CardMedia
                className={classes.cardImage}
                component="img"
                height={size === "sm" ? 90 : size === "xs" ? 60 : 130}
                image={
                    player.mainImage && player.mainImage.resize && player.mainImage.resize.src ? player.mainImage.resize.src : "/yinyang.png"                 
                }
                alt={player.name}
            />
            <CardHeader  
                disableTypography={true}                          
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", color: '#ffffff', backgroundColor: player.itemTitleColor, padding: '4px'}}
                title={<p style={{ fontSize: size === "sm" ? "12px" : size === "xs" ? "10px" : "14px", textAlign: "center", margin: "0"}}>{player.name}</p>}
                subheader={<small style={{ fontSize: size === "sm" ? "11px" : size === "xs" ? "9px" : "12.5px", textAlign: "center", display: "block"}}>&nbsp;{player.chineseName}&nbsp;</small>}
            />
            
            <CardContent className={classes.cardBody}>
                <Typography variant="body2" color="text.secondary" style={{ fontSize: size === "sm" ? "10.5px" : size === "xs" ? "9px" : "12px", margin: "0px" }}>
                    {(player.birthYear || player.deathYear) ? ((player.birthYear || 'unknown') + ' - ' + (player.deathYear || 'unknown')) : 'Dates unknown'}
                </Typography>
                { size === "lg"  && 
                    <Chip size="small" label={player.generation} style={{ fontSize: '12px', color: '#ffffff', backgroundColor: player.itemTitleColor}} /> 
                }
            </CardContent>
            <CardActions sx={{ paddingTop: "0px" }}>
                <Link style={{ textDecoration: "none", width: "100%" }} to={`/players/${player.slug}`}>
                    <Button size={size === "sm" || size === "xs" ? "small" : "medium"} style={{ fontSize: size === "sm" ? "0.8125rem" : size === "xs" ? "0.7rem" : "0.8125rem", width: "100%" }} endIcon={<ArrowForwardIcon style={{ fontSize: size === "sm" ? "17px" : size === "xs" ? "15px" : "18px" }} />}>View</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default PlayerCard;