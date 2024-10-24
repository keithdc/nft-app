import './App.css';
import HeaderAppBar from './components/Header';
import GalleryApp from './components/Gallery';
import {Fragment, useState} from 'react';

function App() {
    const [NFTs, setNFTs] = useState("");

    return (
        <Fragment>
            <HeaderAppBar onGetNFTs={(nfts: []) => setNFTs(nfts)}></HeaderAppBar>
            <GalleryApp NFTs={NFTs}></GalleryApp>
        </Fragment>
    );
}

export default App;
