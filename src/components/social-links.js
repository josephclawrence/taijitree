import React from 'react';

import IconButton from '@mui/material/IconButton';
import MaterialLink from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InboxIcon from '@mui/icons-material/Inbox';

import List from '@mui/material/List';

import ListSubheader from '@mui/material/ListSubheader';

function getSocialIconLink(link) {
    console.log(link);
    console.log(link.includes("facebook"));
    switch (link) {
        case link.includes("facebook"):
            //return (<FacebookIcon sx={{ color: "#4267B2" }} />);
            return <InboxIcon />
            break;
        case link.includes("twitter"):
            return <TwitterIcon sx={{ color: "#1DA1F2" }} />
            break;

        case link.includes("youtube"):
            return <YouTubeIcon sx={{ color: "#FF0000" }} />
            break;

        case link.includes("instagram"):
            return <InstagramIcon sx={{ color: "#d62976" }} />
            break;
        default:
            return;
            break;
    }
}

function SocialLinks(props) {
    const { socialMediaProfiles } = props;

    return (
        <nav aria-label="Social media">
            <List dense={true} subheader={
                <ListSubheader component="div">
                    Social media profiles
                </ListSubheader>
            }>
                <div  style={{ paddingLeft: "8px" }}>
                {socialMediaProfiles && socialMediaProfiles.map((socialMediaProfile, idx) => (
                    <IconButton target="_blank" key={`socialMediaProfile_${idx}`} rel="noopener" href={socialMediaProfile}>
                        {
                            socialMediaProfile.includes("facebook")
                                ? <FacebookIcon sx={{ color: "#4267B2" }} />
                                : socialMediaProfile.includes("twitter")
                                ? <TwitterIcon sx={{ color: "#1DA1F2" }} />
                                : socialMediaProfile.includes("youtube")
                                ? <YouTubeIcon sx={{ color: "#FF0000" }} />
                                : socialMediaProfile.includes("instagram")
                                ? <InstagramIcon sx={{ color: "#d62976" }} />
                                : null
                        }
                    </IconButton>
                ))}
                </div>
            </List>
        </nav>
    );
}

export default SocialLinks;