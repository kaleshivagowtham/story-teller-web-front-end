import { useEffect, useState , useMemo } from "react";
import styles from './styles.module.css';

export default function NavBarSearch({searchRes , setSearchRes , searchText, setSearchText}) {

    const authorsUrl = "http://localhost:5000/authors";

    // const [searchRes , setSearchRes] = useState([]);
    // const [searchText , setSearchText] = useState('');

    const searchHandler = (e) => {
        setSearchText(e.target.value);
    }

    const response = useMemo(() => {
        fetch(authorsUrl , {
            method : 'POST',
            body : JSON.stringify({
                searchText : searchText
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then((JSON) => {
            // console.log("response for", searchText ," : ",JSON.authorsList);
            setSearchRes(JSON.authorsList);
        })
        .catch(err => console.log("Error : ",err)); 
    },[searchText]);

    return (
        <div className={styles.wholeCont}>
            <p className={styles.contTitle}>Search Authors</p>
            <div className={styles.searchCont}>
                <input className={styles.searchInput} onChange={e => searchHandler(e)} />
                <div className={styles.searchImgCont}>
                    <img src='/searchIcon-green.png' className={styles.searchImg}/>
                </div>
            </div>
            <div className={styles.optionsCont}>
            {
                searchRes?.map((item) => {
                    return (
                        <div key={item} className={styles.eachSearchResultCont}>
                            <p className={styles.eachSearchResult}>@{item}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}