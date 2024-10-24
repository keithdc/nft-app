import {Card, CardContent, CardMedia} from '@mui/material';
import Typography from '@mui/material/Typography';

const NFTCard = ({image, id, title, address, description, attributes}) => {
    return (
        <Card>
            <CardMedia
                sx={{height: 300}}
                image={image}
                title={id}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    <a target="_blank" className="text-blue-700" href={`https://etherscan.io/token/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>

                    <p>{description ? description.slice(0, 200) : 'No Description'}</p>
                </Typography>

                <Typography variant="h6" className="!mt-4">
                    Traits
                </Typography>

                <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_100px))]">
                    {attributes?.length > 0 && attributes.map(attribute => {
                        return (
                            <CardContent>
                                <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                    {attribute.trait_type}:
                                </Typography>
                                <Typography variant="body2">{attribute.value}
                                </Typography>
                            </CardContent>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default NFTCard;