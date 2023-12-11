import { ChangeEvent, useState } from 'react'
import './App.css'

function App() {

  interface Endereco {

    cep: string | null
    logradouro?: string 
    bairro?: string 
    cidade?: string
    estado?: string

  }

  interface DadosApiCep {

    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string

  }



  const [endereco, setEndereco] = useState<Endereco>({ cep: null })

  async function manipularEndereco(evento: ChangeEvent) {

    const target = evento.target as HTMLInputElement
    const cep: string = target.value

    setEndereco(antigoEndereco => ({ ...antigoEndereco, cep: cep }))

    // console.log(endereco.cep);
    // setEndereco({ cep: target.value })
    // console.log(endereco.cep);

    // if (endereco.cep && endereco.cep.length === 8) {
    if (cep.length === 8) {

      try {
        
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        
        const dados: DadosApiCep = await resposta.json()
  
        setEndereco(antigoEndereco => ({
            ...antigoEndereco,
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          }))

        // setEndereco({
        //   ...endereco,
        //   logradouro: dados.logradouro,
        //   bairro: dados.bairro,
        //   cidade: dados.localidade,
        //   estado: dados.uf
        // })
  
        console.log(endereco);

      } catch (error) {
        
        console.error('Error fetching or updating data', error)

      }


    } 

  }

  return (
    <>
      <input 
        type="text" 
        placeholder='Digite o CEP' 
        onChange={manipularEndereco}
        maxLength={8}
      />
      <ul>
        <li>CEP: {endereco.cep}</li>
        <li>Logradouro: {endereco.logradouro}</li>
        <li>Bairro: {endereco.bairro}</li>
        <li>Cidade: {endereco.cidade}</li>
        <li>Estado: {endereco.estado}</li>
      </ul>
    </>
  )
}

export default App
