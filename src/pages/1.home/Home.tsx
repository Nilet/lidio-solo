import LabsWrapper from "../../components/LabsWrapper";
import '../../index.css'
import Button from "../../components/Button";

function Home() {
    return (
        <>
            <LabsWrapper />
            <Button content="testeHealthCheck" callback={async () => {
                const response = await fetch("http://localhost:3001/health-check");
                const result = await response.json()
                console.log(result)
            }} />
        </>
    )
}

export default Home
