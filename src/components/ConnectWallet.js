import * as React from 'react';
import {Fragment, useState} from 'react';
import Button from '@mui/material/Button';
import {CallbackNFTProps} from '../services/nft.interface';
import Typography from '@mui/material/Typography';
import {Snackbar, Stack, TextField} from '@mui/material';


const ConnectWallet = (props: CallbackNFTProps) => {

    const [open, setOpen] = React.useState(false);
    const [WalletAddress, setWalletAddress] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [ApiKey, setApiKey] = useState('');
    const [Wallet, setWallet] = useState('');

    const connectWallet = async () => {
        const response = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${ApiKey}/getNFTsForOwner?owner=${Wallet}&withMetadata=true&pageSize=100`, {});
        return await response?.json();
    };

    const handleConnectWallet = (event: MouseEvent) => {
        props.onLoad(true);
        connectWallet().then(res => {
            setWalletAddress(res.validAt.blockHash);
            props.onGetNFTs(res.ownedNfts);
        }).catch(error => {
            setErrorMessage(error.message);
            setOpen(true);
        }).finally(() => props.onLoad(false));
    };

    const handleDisonnectWallet = (event: MouseEvent) => {
        setWalletAddress('');
        props.onGetNFTs([]);
    };

    const handleReset = (event: MouseEvent) => {
        setApiKey('');
        setWallet('');
    };

    return (<Fragment>
        {
            WalletAddress ?
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'black' }}>
                        Wallet Address: {WalletAddress.slice(0, 6)}...{WalletAddress.slice(WalletAddress.length - 4)}
                    </Typography>
                    <Button color="inherit" onClick={handleDisonnectWallet}>Disconnect Wallet</Button>
                </Stack>
                :
                <Stack direction="row" spacing={2}>

                    {
                        ApiKey || Wallet ? <Button color="inherit" onClick={handleReset} disabled={!(ApiKey || Wallet)}>Reset</Button> : null
                    }
                    <TextField id="outlined-basic" label="API Key" variant="outlined" size="small" value={ApiKey} onChange={(e) => setApiKey(e.target.value)}/>
                    <TextField id="outlined-basic" label="Wallet" variant="outlined" size="small" value={Wallet} onChange={(e) => setWallet(e.target.value)}/>
                    <Button color="inherit" onClick={handleConnectWallet} disabled={!(ApiKey && Wallet)}>Connect Wallet</Button>
                </Stack>
        }
        <Snackbar
            open={open}
            autoHideDuration={2000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            message={ErrorMessage}
        />
    </Fragment>);
};

export default ConnectWallet;