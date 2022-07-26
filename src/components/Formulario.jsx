import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Error from './Error'
import useSelectList from "../hooks/useSelectList"
import { monedas } from '../data/monedas'

const InputSubtmit = styled.input`
    background-color:#9497FF;
    border: none;
    width: 100%;
    padding:10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 8px;
    transition: background-color .4s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setDatosForm}) => {
    const [criptoData, SetCriptoData] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectList('Elije tu Moneda:', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectList('Elije tu Criptomoneda:', criptoData)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                return { 
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
            }); 

            SetCriptoData(arrayCriptos)
        }
        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if([moneda, criptomoneda].includes('')){
            setError(true)
            return
        } 
        setError(false)
        setDatosForm({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas/>
                <SelectCriptomoneda/>
                <InputSubtmit
                    type="submit" 
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario