import type {NFTProps} from '../services/nft.interface';
import NFTCard from './NFTCard';
import {Pagination} from '@mui/material';
import {Fragment, useEffect, useState} from 'react';

const GalleryApp = (props: NFTProps) => {
    const [PaginationCount, setPaginationCount] = useState(0);
    const [NFTs, setNFTs] = useState('');
    const defaultCount = 10;

    useEffect(() => {
        const paginationCount = Math.ceil(props.NFTs.length / defaultCount);
        setPaginationCount(paginationCount);
    }, [props.NFTs]);

    useEffect(() => {
        handleChangePage(undefined, 1);
    }, [PaginationCount])

    const handleChangePage = (e, page: number) => {
        const begin = (page - 1) * defaultCount;
        const end = begin + defaultCount;
        setNFTs(props.NFTs.slice(begin, end));
    };

    return (
        <Fragment>
            <section className="p-10 gap-6 grid grid-cols-[repeat(auto-fit,_minmax(300px,_300px))]">
                {
                    NFTs ? NFTs.map(NFT => {
                        return (
                            <NFTCard image={NFT.image.originalUrl} id={NFT.tokenId} title={NFT.name} address={NFT.contract.address} description={NFT.description}
                                     attributes={NFT.raw.metadata.attributes}></NFTCard>
                        );
                    }) : <div>No NFTs found</div>
                }
            </section>
            {
                props.NFTs.length ? <Pagination count={PaginationCount} size="large" className="px-10 py-6" onChange={handleChangePage} /> : null
            }
        </Fragment>
    );
};


export default GalleryApp;