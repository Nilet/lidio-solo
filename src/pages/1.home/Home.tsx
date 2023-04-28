import LabsWrapper from "../../components/LabsWrapper";
import '../../index.css'
import Button from "../../components/Button";


function Home() {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    return (
        <>
            <LabsWrapper />
            <Button content="testeHealthCheck" callback={async () => {
                const response = await fetch(`${apiUrl}/health-check`);
                const result = await response.json()
                console.log(result)
            }} />
        </>
    )
}

export default Home
