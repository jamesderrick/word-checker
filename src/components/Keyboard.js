import { Button, Stack } from "react-bootstrap";

function Keyboard({onChange}) {

    const topRow = ['Q','W','E','R','T','Y','U','I','O','P']
    const middleRow = ['A','S','D','F','G','H','J','K','L']
    const bottomRow = ['Z','X','C','V','B','N','M']

    return (
        <>
        <Stack direction="horizontal" gap={1} className="mx-auto mb-2 justify-content-center">
            {topRow.map(letter => {
                return (
                    <Button key={letter} name={letter} onClick={onChange} className="btn btn-secondary">
                        {letter}
                    </Button>
                )
            })}
        </Stack>
        <Stack direction="horizontal" gap={2} className="mx-auto mb-2 justify-content-center">
            {middleRow.map(letter => {
                return (
                    <Button key={letter} name={letter} onClick={onChange} className="btn btn-secondary">
                        {letter}
                    </Button>
                )
            })}
        </Stack>
        <Stack direction="horizontal" gap={2} className="mx-auto mb-2 justify-content-center">
            {bottomRow.map(letter => {
                return (
                    <Button key={letter} name={letter} onClick={onChange} className="btn btn-secondary">
                        {letter}
                    </Button>
                )
            })}
        </Stack>
        </>
    )
}

export default Keyboard