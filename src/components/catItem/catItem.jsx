import axios from "axios";
import {useEffect, useState} from "react";
import {TelegramIcon, TelegramShareButton, VKIcon, VKShareButton} from "react-share";
import styles from "./catItem.module.css";
import Tag from "../tag";
import Preloader from "../preloader";
import cn from "classnames";
import LinkButton from "../linkButton";

const CatItem = () => {
    const [catImg, setCatImg] = useState('');
    const [catTags, setCatTags] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const getCatData = () => {
        return axios.get('https://cataas.com/cat?json=true')
            .then(res => ({
                id: res.data.id,
                tags: res.data.tags
            }));
    }


    useEffect(() => {
        let cancel = false

        getCatData().then(res => {
            if (!cancel) {
                setCatImg(res.id);
                setCatTags(res.tags);
            }
        })

        return () => {
            cancel = true
        };
    }, []);

    if (catImg === '') {
        return null;
    }

    const catImgUrl = `https://cataas.com/cat/${catImg}`;

    return (
        <div className={styles.catItem}>

            <img className={cn({
                [styles.isNotLoaded]: !isLoad,
                [styles.loaded]: isLoad,
            })} src={catImgUrl} alt="" onLoad={() => setIsLoad(true)}/>

            {!isLoad && <Preloader/>}

            <div className={styles.catItemBottom}>
                <div className={styles.catItemTags}>
                    {catTags.map(i => <Tag key={i} text={i}/>)}
                </div>


                <div className={styles.catItemButtons}>
                    <VKShareButton
                        image={catImgUrl}
                        url={catImgUrl}
                        noParse={true}
                        title={"котик"}
                    >
                        <VKIcon size={35} round={true}/>
                    </VKShareButton>

                    <TelegramShareButton url={catImgUrl}>
                        <TelegramIcon size={35} round={true}/>
                    </TelegramShareButton>

                    <LinkButton size={35} url={catImgUrl}/>
                </div>
            </div>

        </div>
    );
};

export default CatItem;
