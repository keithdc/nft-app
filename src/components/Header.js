import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ConnectWallet from './ConnectWallet';
import {CallbackNFTProps} from '../services/nft.interface';
import {Fragment, useState} from 'react';
import {LinearProgress, TextField} from '@mui/material';


const HeaderAppBar = (props: CallbackNFTProps) => {
    const [Onload, setOnLoad] = useState();
    const [NFTs, setNFTs] = useState('');

    const handleFilteredNfts = (nfts) => {
        const filteredNFTs = nfts.filter(NFT => !!NFT.image.originalUrl);
        setNFTs(filteredNFTs);
        props.onGetNFTs(filteredNFTs);
    };

    const handleSearch = (search) => {
        props.onGetNFTs(NFTs.filter(NFT => !!NFT.image.originalUrl && NFT.name?.toLowerCase().includes(search.target.value.toLowerCase())));
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography component="div" sx={{display:'flex', alignItems: 'center', flexGrow: 1}}>
                        <Typography variant="h6" component="div">
                            NFT
                        </Typography>

                        <TextField className="!ml-6" id="outlined-basic" label="Search" variant="outlined" size="small" onChange={handleSearch} disabled={NFTs.length === 0}/>
                    </Typography>

                    <ConnectWallet onGetNFTs={handleFilteredNfts} onLoad={(onLoad: boolean) => setOnLoad(onLoad)}></ConnectWallet>
                </Toolbar>
                {
                    Onload ? <LinearProgress color="secondary"/> : null
                }
            </AppBar>
        </Box>
    );
};


export default HeaderAppBar;