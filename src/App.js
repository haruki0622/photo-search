import React, { useEffect, useState } from "react";
import './styles/App.css'

const App = () => {

    const [images, setImages] = useState([]);
    const [text, setText] = useState('');
    const [query, setQuery] = useState('cat');

    //第2引数にqueryを渡して、渡されたときにuseEffectが動く
    //APIで画像をunsplashから取ってくる
    useEffect(() => {
    console.log('useEffectが走りました。')
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setImages(data.results)
        })
  }, [query])

    const onSubmit = (e) => {
        e.preventDefault();
        setQuery(text);
        setText('');
        console.log("onSubmitが呼ばれました");
    };

    return(
        <div className="app">
            <div className="main">
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        onChange={e => setText(e.target.value)}
                        value = {text}
                    />
                    <button type="submit">
                        Search
                    </button>
                </form>
            </div>
            <div className="container">
                {
                    images.map((image) => (
                        <div key={image.id} className="card">
                            <img src={image.urls.regular} className="card-img"/>
                            <div className="card-content">
                                <div className="card-title">
                                    {image.alt_description}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default App