import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles.js'
import wordsToNumbers from "words-to-numbers";
import dotenv from "dotenv";

dotenv.config() 

const App = () => {
    const classes = useStyles()
    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1);

    const alanKey = '4e270577af61d6a4d9b3c2c1b09f086d2e956eca572e1d8b807a3e2338fdd0dc/stage'


    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles)
                    setActiveArticle(-1);
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;                    
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again')
                    } else {
                        window.open(article.url, '_blank')
                        alanBtn().playText('Opening...')
                    }
                }
            }
        })
    }, [])

    const alanLogoSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLTD04b5O8aDbc6u4PAgPj_WAfeel0YLVWvg&usqp=CAU'

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src={alanLogoSrc} className={classes.alanLogo} />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App
