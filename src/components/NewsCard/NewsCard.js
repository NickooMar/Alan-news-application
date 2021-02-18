import React, { useState, useEffect, createRef} from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import useStyles from "./styles";
import classNames from "classnames";


const NewsCard = ({ article, i }, activeArticle) => {
    
    const { description, publishAt, source, title, url, urlToImage } = article;
    const classes = useStyles()
    const [elRefs, setElRefs] = useState([])
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50)

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[article]){
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs])

    return (
        <Card ref={elRefs[i]} className={activeArticle === i ? classes.activeCard : classes.card}>
            <CardActionArea href={url} tartget="_blank">
                <CardMedia className={classes.media} image={urlToImage || 'https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=6&m=1182477852&s=612x612&w=0&h=X-UipiiX5xcMw9dBhzKZWG7UcWjEOARl2s_oTVV8rtE='} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title}  variant="h5" gutterBottom >{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions} >
                <Button contained size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard
