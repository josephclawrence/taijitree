import React from 'react';

import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CollectionsIcon from '@mui/icons-material/Collections';
import ListSubheader from '@mui/material/ListSubheader';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import SocialLinks from '../components/social-links';

function PlayerSidebar(props) {
    const { wikipedia, websites, socialMediaProfiles, gallery, videos, links } = props;

    function scrollTo(id) {
        const element = document.getElementById(id);
        console.log(element);
        element && element.scrollIntoView({ behavior: "smooth", block: "start"});
    }

    return (

        <Box sx={{ width: '100%', position: "sticky", top: "0", bgcolor: 'background.paper' }}>
            <nav aria-label="Page links">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={(e) => { e.preventDefault(); scrollTo("MainBio"); }}>
                            <ListItemIcon>
                                <LocalLibraryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Main biography" />
                        </ListItemButton>
                    </ListItem>
                    { gallery &&
                        <ListItem disablePadding>
                            <ListItemButton component="a" onClick={(e) => { e.preventDefault(); scrollTo("PlayerGallery"); }}>
                                <ListItemIcon>
                                    <CollectionsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Gallery" />
                            </ListItemButton>
                        </ListItem>
                    }
                    { videos &&
                        <ListItem disablePadding>
                            <ListItemButton component="a" onClick={(e) => { e.preventDefault(); scrollTo("PlayerVideos"); }}>
                                <ListItemIcon>
                                    <VideoLibraryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Videos" />
                            </ListItemButton>
                        </ListItem>
                    }
                    { links &&
                        <ListItem disablePadding>
                            <ListItemButton component="a" onClick={(e) => { e.preventDefault(); scrollTo("PlayerLinks"); }}>
                                <ListItemIcon>
                                    <LinkIcon />
                                </ListItemIcon>
                                <ListItemText primary="Links" />
                            </ListItemButton>
                        </ListItem>
                    }
                </List>
            </nav>
            <Divider />
            { socialMediaProfiles && 
                <>
                    <SocialLinks socialMediaProfiles={socialMediaProfiles} style={{ paddingLeft: "8px"}} />
                    <Divider />
                </>
            }

            { websites && 
                <>
                    <nav aria-label="Websites and social media">
                        <List dense={true} subheader={
                            <ListSubheader component="div">
                            Websites
                            </ListSubheader>
                        }>
                            { websites && websites.map((website, i) => (
                                <ListItem disableGutters key={`websitelink_${i}`}>
                                    <ListItemButton component="a" href={website} target="_blank" rel="noopener">
                                        <ListItemText primary={website} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List> 
                    </nav>
                    <Divider />
                </>
            }
            
            { wikipedia && (
                <>
                    <nav aria-label="Wikipedia">
                        <List dense={true} subheader={
                            <ListSubheader component="div">
                            Wikipedia
                            </ListSubheader>
                        }>
                            <ListItem disableGutters>
                                <ListItemButton component="a" href={wikipedia} target="_blank" rel="noopener">
                                    <ListItemText primary="wikipedia Article" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <Divider />
                </>
            )}
                        
        </Box>

            
    )
}

export default PlayerSidebar;