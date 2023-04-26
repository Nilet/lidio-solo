import { useState, useEffect } from "react";
import Button from "../../components/Button.tsx";
import LoadingButton from "../../components/LoadingButton";


function Teste() {
    const labs = ["Router", "Test" ]
    const [selectedLab, setSelectedLab] = useState("")
    const mudaBotao = (lab: string) => {
        setSelectedLab(lab)
    }

    useEffect(() => {
        if (selectedLab === "") {
            return;
        }
        const timeoutId = setTimeout(() => {
            window.location.pathname = '/'
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [selectedLab]);

    return (
        <div className="text-center">
            <h2 className="text-2xl mb-16">
                Selecione o laboratório
            </h2>
            <div className="flex justify-center">
                {labs.map((lab) => {
                    return (
                        lab === selectedLab ? <LoadingButton /> : <Button content={lab} callback={() => mudaBotao(lab)} />
                    )
                })}
            </div>
        </div>
    )
}

export default Teste
