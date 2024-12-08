import React, {useEffect} from 'react';
import "./Personalizacija.css"

const Personalizacija = () => {
    const inputRef = React.useRef(null)
    const [uploaded, setUploaded] = React.useState(false)
    const [showing,setShowing] = React.useState(false)
    const [fileName, setFileName] = React.useState({})
    const handleButtonClick = () => {
        inputRef.current.click()
    }
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.setAttribute("chatbotId", "QCI0v2we6l3EAfZxJsQKP");
        script.setAttribute("domain", "www.chatbase.co");
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const show = () => {
        setShowing((value) => !value)
    }
    return (
        <>
            <div style={showing ? {height: "250vh"} : {height: "100vh"}}>
                <div className="container1">
                    <div className="card">
                        <h3>Upload Files</h3>
                        <div className="drop_box">
                            {uploaded? (<form action="" method="post">
                                <div className="form">
                                    <h4>${fileName}</h4>
                                    <button type="button" onClick={show} className="btn1" id="personalizedButton">Prikazi
                                        personalizovano
                                    </button>
                                    <div id="personalizedMessage">{showing &&(<>
                                        <p style={{marginTop: "30%"}}>Radnja koja je upravo završena:</p>
                                        <p>Kod ovakvih rečenica često koristimo prilog <strong>just</strong> (upravo), koji stoji između glagola <em>to have</em> i participa prošlog:</p>
                                        <p><em>She has just finished her ballet practice.</em> (Ona je upravo završila svoj baletski trening.)</p>
                                        <p><em>I have just watered the roses.</em> (Upravo sam zalio ruže.)</p>

                                        <p>Radnja koja se desila u prošlosti u neko neodređeno vreme:</p>
                                        <p>Ova radnja se ne vezuje za tačan trenutak u prošlosti:</p>
                                        <p><em>I have performed on a big stage.</em> (Nastupao/la sam na velikoj sceni.)</p>
                                        <p><em>She has planted tulips in the garden.</em> (Zasadila je tulipane u bašti.)</p>

                                        <p>Prošla radnja koja ima vidljive rezultate u sadašnjosti:</p>
                                        <p><em>The ballet shoes have worn out. I need a new pair.</em> (Baletanke su se izlizale. Treba mi novi par.)</p>
                                        <p><em>I have arranged the flowers. The bouquet looks stunning.</em> (Složio/la sam cveće. Buket izgleda prelepo.)</p>

                                        <p>Za radnju koja kazuje neko životno iskustvo:</p>
                                        <p>U ovom značenju često koristimo priloge <strong>ever</strong> (ikada) i <strong>never</strong> (nikad):</p>
                                        <p><em>She has never missed a ballet performance.</em> (Ona nikada nije propustila baletsku predstavu.)</p>
                                        <p><em>Have you ever grown orchids?</em> (Da li si ikada uzgajao/la orhideje?)</p>

                                        <p>Za radnju koja se dogodila ranije nego što je očekivano:</p>
                                        <p>Ovde koristimo prilog <strong>already</strong> (već):</p>
                                        <p><em>I’ve already rehearsed the new ballet routine.</em> (Već sam vežbao/la novu baletsku koreografiju.)</p>
                                        <p><em>She has already picked fresh daisies for the vase.</em> (Već je ubrala sveže bele rade za vazu.)</p>

                                        <p>Za očekivanu radnju:</p>
                                        <p>Ovde koristimo <strong>yet</strong> (još uvek/do sad) u upitnim i odričnim rečenicama:</p>
                                        <p><em>Have you decorated the dance studio with flowers yet?</em> (Da li si već ukrasio/la plesni studio cvećem?)</p>
                                        <p><em>I haven’t finished arranging the lilies yet.</em> (Još uvek nisam završio/la sa slaganjem ljiljana.)</p></>)}</div>
                                </div>
                            </form>) : <>
                                <header>
                                    <h4>Select File here</h4>
                                </header>
                                <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    hidden
                                    accept=".doc,.docx,.pdf"
                                    id="fileID"
                                    style={{display: "none"}}
                                    onChange={(e) => {
                                        setFileName(e.target.files[0].name)
                                        setUploaded(true)
                                    }}
                                />
                                <button onClick={handleButtonClick} className="btn1">Choose File</button>
                            </>
                            }


                        </div>
                    </div>
                </div>
            </div>
            <script
                src="./script.js"
            ></script>
        </>

    );
};

export default Personalizacija;