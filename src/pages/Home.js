import { useState } from 'react';
import { Button, Spinner, Stack } from 'react-bootstrap';
import Keyboard from '../components/Keyboard';
import axios from 'axios';
import Results from '../components/Results';

function Home() {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])

    function handleChange({target}) {
        let _currentWord = search
        _currentWord += target.name
        setSearch(_currentWord)
    }

    function handleDelete() {
        const _currentWord = search
        const edited = _currentWord.slice(0,-1)
        setSearch(edited)
    }

    function handleReset() {
        setSearch('')
        setResults([])
    }

    function handleSubmit() {
        setLoading(true)

        const _word = search.replace(/\?/g,'.').toLocaleLowerCase()
        console.log(_word)
        const letterCount = _word.length
        console.log(letterCount)

        const options = {
            method: 'GET',
            url: process.env.REACT_APP_API_URL,
            params: {
                letterPattern: `^${_word}$`, 
                lettersMin: letterCount,
                lettersMax: letterCount,
                limit: '100', 
                page: '1'
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setResults(response.data.results.data)
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
            setLoading(false)
        });

    }

    return (
        <>
        <div style={{width: '390px', margin: 'auto'}}>
            <Stack direction="horizontal" className="mx-auto mb-1 justify-content-center">
                <h1 style={{textAlign: 'center', padding: '20px'}}>Word Check</h1>
            </Stack>
        </div>
        <div style={{width: '390px', minHeight: '60px', fontSize: '36px', textAlign: 'center', margin: 'auto'}}>
            {search.split("").map((char,index) => {
                return (
                    <div 
                        key={`letter-${index}`}
                        style={{
                            display: 'inline-block', 
                            width: '50px',
                            height: '50px', 
                            textAlign: 'center',
                            border: '1px solid'
                        }}
                    >
                        {char}
                    </div>
                )
            })}
        </div>
        {loading ?
        <div style={{textAlign: 'center'}}>
            <Spinner animation="border" role="status" style={{textAlign: 'center'}}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <br/>
            Fetching results...
        </div>
        :
        <>
        {results.length > 0 ?
            <Results data={results} style={{margin: '0 10'}} />
            :
            <div style={{width: '390px', margin: 'auto'}}>
                <Stack direction="horizontal" className="mx-auto mb-1 justify-content-center">
                    <p style={{textAlign: 'center'}}>
                        Enter your word and click Search
                        <br/>
                        Use ? as a wildcard
                    </p>
                </Stack>
            </div>
        }
        </>
        }
        <div style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            <div style={{position: 'relative', marginBottom: '20px', width: '390px', margin: 'auto'}}>
                <Stack direction="horizontal" className="mx-auto mb-1 justify-content-end">
                    <Button 
                        name="reset" 
                        className="btn btn-danger mb-2" 
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Stack>
                <Keyboard onChange={handleChange} />
                <Stack direction="horizontal" className="mx-auto mb-1 justify-content-center">
                    <Button 
                        name="?" 
                        className='btn btn-secondary'
                        onClick={handleChange}
                    >
                        ?
                    </Button>
                    <Button 
                        name="search" 
                        className='btn btn-success'
                        onClick={handleSubmit}
                        style={{marginLeft: '20px', marginRight: '20px', paddingLeft: '100px', paddingRight: '100px'}}
                    >
                        Search
                    </Button>
                    <Button 
                        name="delete" 
                        className='btn btn-danger'
                        onClick={handleDelete}
                    >
                        DEL
                    </Button>
                </Stack>
            </div>
        </div>
      </>
    )
}

export default Home