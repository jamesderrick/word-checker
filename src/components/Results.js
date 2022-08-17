function Results({data}) {
    return (
        <>
        <div style={{textAlign:'center'}}>
            <span>{data.length} words found</span>
        </div>
        <div style={{
                textAlign: 'center', 
                maxHeight: '40vh', 
                overflow: 'auto', 
                fontSize: '24px', 
                margin: '20px 0px'
            }}
        >
        {data.length > 0 ? 
            data.map((word, index) => {
                return (
                    <p key={`word-${index}`}>{word}</p>
                )
            })
            :
            <p>No words found!</p>
        }
        </div>
        </>
    )
}

export default Results