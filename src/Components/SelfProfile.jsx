import React, {useState} from 'react';
import XOutline from "../assets/XOutline.png";
import BanOutline from "../assets/BanOutline.png";
import Trash from "../assets/Trash.png";

function SelfProfile() {
    const [openProfile,setOpenProfile] = useState(false)

    const handleOpenProfile  = () => {
        setOpenProfile(true);
    }
    return (
        <>
            <div className={'open_prof'}>
                <div className={'openProf-nav'}>
                    {/*cross laga dena img me*/}
                    <img src={XOutline} onClick={() => setOpenProfile(false)}/>
                    <p>Profile</p>
                </div>
                <div className={'profilepic-o'}>
                    {/*profilepic*/}
                    <img id={'open-prof-pic'}
                         src={'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww'}/>
                    <p>nigger</p>
                </div>
                <div className={'partion'}></div>
                <div className={'select-about'}>
                    <p id={'abou'}>About</p>
                    <p id={'ab'}>Hey my name is test , i was the origninal test user of this website</p>
                </div>
                <div className={'partion'}></div>
                <div className={'media-sent'}>
                    <p> Media Sent</p>
                    <p>0</p>
                </div>
                <div className={'partion'}></div>
                <div className={'danger-but'}>
                    <div className={'ban'}>
                        <img src={BanOutline}/>
                        <p>Blacklist </p>
                    </div>
                    <div className={'del'}>
                        <img src={Trash}/>
                        <p>Delete Chat</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelfProfile;
