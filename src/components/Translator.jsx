import { useState, useEffect } from 'react'
import countryCodes from '../data/countryCodes'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { ThemeProvider, useTheme } from '../context/ThemeContext'


export function Translator() {

  const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : "#fff",
        color: darkTheme ? '#fff' : "#333"
    }

  const [ forTranslation, setForTranslation ] = useState({
    languageTo: "en-Gb",
    languageFrom: "ru-RU",
    textOriginal: ""
  })

  const [ translation, setTranslation ] = useState({
    textTranslated: "",
    quality: ""
  })


    useEffect(() => {
      fetch(`https://api.mymemory.translated.net/get?q=${forTranslation.textOriginal}&langpair=${forTranslation.languageFrom}|${forTranslation.languageTo}&de="tanyapich@gmail.com"`)
    .then(data => data.json())
    .then(data => {
      setTranslation({
        textTranslated: data.matches[0].translation,
        quality: data.matches[0].match
      })
      })
    }, [ forTranslation, translation ])
  

  
    const qualityColor = translation.quality && (translation.quality > 0.85 ? "#90EE90" : translation.quality > 0.7 ? "#FFFFCC" : "#ffcccb")

    function handleSubmit(e) {
      e.preventDefault()
    }

    function handleChange(e) {
      setForTranslation(prevForTranslation => {
        return {
          ...prevForTranslation,
          [e.target.name]: e.target.value
        }
      })
      console.log(forTranslation)
    }

    function reverseTranslation() {
        setForTranslation(prevForTranslation => {
          return {
            languageTo: prevForTranslation[languageFrom],
            languageFrom: prevForTranslation[languageTo],
            textOriginal: translation.textTranslated
          }
        })
        setTranslation({
          textTranslated: '',
          quality: 0
        })
    }

    function copyTranslation() {
      const text = document.querySelector('#textTranslated')
      console.log(text)
      text.select()
      text.setSelectionRange(0, 99999)
      navigator.clipboard.writeText(text.value)
    }

    const languageOptions = []
    for(let code in countryCodes) {
      languageOptions.push(
        <option value={code}>{countryCodes[code]}</option>
      )
    }

    const languageOptionsRus = [
      <option value={"ru-Ru"}>Russian</option>,
      <option value={"en-GB"}>English</option>
      ,...languageOptions
    ]

    const languageOptionsEng = [
      <option value={"en-GB"}>English</option>,
      <option value={"ru-Ru"}>Russian</option>,
      ...languageOptions
    ]


  return (
    <Container-fluid style={themeStyles}>
    <form onSubmit={handleSubmit} style={{backgroundColor: themeStyles.backgroundColor}}>
      
        <Row>
          <Col>
              <select 
                  style={themeStyles}
                  className="form-control"
                  id="languageFrom"
                  value={forTranslation.languageFrom}
                  onChange={handleChange}
                  name="languageFrom"
              >
                {languageOptionsRus}
              </select>
          </Col>
          <Col>
              <select 
                  style={themeStyles}
                  className="form-control"
                  id="languageTo"
                  value={forTranslation.languageTo}
                  onChange={handleChange}
                  name="languageTo"
              >
                {languageOptionsEng}
              </select>
          </Col>
        </Row>
   
      <Row sm={2} xs={1}>
        <Col >
            <textarea 
                style={{...themeStyles, height: '200px'}}
                className="w-100 form-control mt-4"
                value={forTranslation.textOriginal}
                placeholder="Enter your text here"
                onChange={handleChange}
                id="textOriginal"
                name="textOriginal"
            />
        </Col>
        <Col >
            <textarea 
                style={{...themeStyles, height: '200px'}}
                id="textTranslated"
                className="w-100  form-control mt-4"
                value={translation.textTranslated}
                readOnly
            />
        </Col>
    </Row>
  


    </form>
    <div className="d-flex justify-content-center py-3" style={{backgroundColor: themeStyles.backgroundColor}}>
    <Button
        onClick={reverseTranslation}
        style={{ 
          width: "3rem", 
          height: "3rem", 
          marginRight: ".8rem"
        }}
        variant="outline-primary"
    >
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512"
        fill="currentColor">
        <path d="M32 176h370.8l-57.38 57.38c-12.5 12.5-12.5 32.75 0 45.25C351.6 284.9 359.8 288 368 288s16.38-3.125 22.62-9.375l112-112c12.5-12.5 12.5-32.75 0-45.25l-112-112c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L402.8 112H32c-17.69 0-32 14.31-32 32S14.31 176 32 176zM480 336H109.3l57.38-57.38c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-112 112c-12.5 12.5-12.5 32.75 0 45.25l112 112C127.6 508.9 135.8 512 144 512s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L109.3 400H480c17.69 0 32-14.31 32-32S497.7 336 480 336z"/></svg>
    </Button>

    <Button
        onClick={copyTranslation}
        style={{ 
          width: "3rem", 
          height: "3rem", 
          marginLeft: ".8rem"
        }}
        variant="outline-primary"
        >
        <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512"
        fill="currentColor"
        >
        <path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"/></svg>
    </Button>
    </div>
  
    </Container-fluid>
 
    
    
  )
}


