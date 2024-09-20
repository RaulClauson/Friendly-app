import Cabecalho from "../../Components/Cabecalho/Cabecalho"
import Friendly_Input from '../../Components/Friendly_Input/Friendly_Input'
import Friendly_Exemplos from '../../Components/Friendly_Exemplos/Friendly_Exemplos'

const Friendly: React.FC = () => {
    return (
        <>
        <section>
            <Cabecalho titulo='FRIENDLY'/>
            <Friendly_Exemplos/>
            <Friendly_Input/>
        </section>
        </>
    )
}

export default Friendly