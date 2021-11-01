import {useCallback, useEffect, useState} from "react";
import CatItem from "./components/catItem";
import {useInView} from "react-intersection-observer";
import Container from "./components/container";
import cn from "classnames";
import styles from "./App.module.css"
import {randomNumber} from "./utilities/math";
import CopyNotification from "./components/copyNotification";
import NotificationContext from "./context/notificationContext";

function App() {
    const [catArr, setCatArr] = useState([<CatItem/>])
    const [ref, inView] = useInView({});
    const [backgroundKey] = useState(randomNumber(0, 4));
    const [isCopy, setIsCopy] = useState(false)

    const call = useCallback(() => {
        const uploadCats = () => {
            const newCatArr = [];

            for (let i = 0; i < 10; i++) {
                newCatArr.push(<CatItem/>);
            }
            setCatArr(prevArr => [...prevArr, ...newCatArr]);
        }

        uploadCats();

    }, []);
    const backgrounds = ['warm', 'blue', "light", "green", "orange"];


    useEffect(() => {
        if (inView === true) {
            call();
        }
    }, [inView, call]);


    return (
        <NotificationContext.Provider value={{setIsCopy: setIsCopy}}>
            <div className={cn(`${styles[backgrounds[backgroundKey]]}`)}>
                    {isCopy && <CopyNotification/>}
                <Container>

                    {catArr.map((cat, i) => {
                        if (catArr.length === i + 1) {
                            return <div key={i} ref={ref} className={styles.catWrap}>{cat}</div>
                        } else {
                            return <div key={i} className={styles.catWrap}>{cat}</div>
                        }
                    })}
                </Container>
            </div>
        </NotificationContext.Provider>

    );
}

export default App;
