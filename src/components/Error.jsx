import styled from "@emotion/styled" 

const Mensaje = styled.div`
    background-color: #B7322C;
    color: #FFFFFF;
    padding:15px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

const Error = ({children}) => {
  return (
    <Mensaje>{children}</Mensaje>
  )
}

export default Error