import './index.css'
import { Button, Col, Form, Radio, Row, Space, Typography } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { loanAsync, selectCalc } from '../features/loan/loanSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useEffect, useState } from 'react'
import CustomSlider from './Component/CustomSlider'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'

export const addSpaces = (num: number) => {
  const spaceAfter = 3
  const rev = num.toString().split('').reverse()
  for (let i = Math.floor((rev.length - 1) / spaceAfter); i > 0; i--) {
    rev.splice(spaceAfter * i, 0, ' ')
  }
  return rev.reverse().join('')
}

const addSpacesToFloat = (num: number) => {
  const arStr = num.toFixed(2).split('.')
  return [addSpaces(parseInt(arStr[0])), arStr[1]].join(',')
}

const Loan = () => {
  const min = 20000
  const max = 800000
  const initVal = 100000
  const units = 'Kč'
  const minM = 24
  const maxM = 96
  const initValM = 48
  const rate = 6
  const ensure = 4500

  const dispatch = useAppDispatch()
  const { calcRedux } = useAppSelector(selectCalc)

  const [amount, setAmount] = useState(initVal)
  const [termMonths, setTermMonths] = useState(initValM)
  const [ensurance, setEnsurance] = useState(false)
  const [calc, setCalc] = useState(0.0)

  const { Paragraph, Title } = Typography

  useEffect(() => {
    setCalc(calcRedux)
  }, [calcRedux])

  useEffect(() => {
    dispatch(
      loanAsync({
        amount: amount,
        rate: rate,
        termMonths: termMonths,
      })
    )
  }, [amount, termMonths, ensurance, dispatch])

  const onChangeEnsurance = (e: RadioChangeEvent) => {
    setEnsurance(e.target.value)
  }

  useEffect(() => {}, [amount])
  return (
    <div>
      <div className='container'>
        <div className='wrapper'>
          <Form>
            <Row>
              <Col span={20}>
                <Title level={2}>Expres půjčku schválíme online do 5 minut</Title>
              </Col>
            </Row>
            <CustomSlider
              title='Kolik si chci půjčit'
              units={units}
              min={min}
              max={max}
              step={1000}
              initVal={initVal}
              helpS={{
                press: 'Povolené znaky jsou číslice',
                change: `Povolené hodnoty jsou v rozmezí od ${min} do ${max}.`,
              }}
              inputValue={amount}
              setInputValue={setAmount}
            />
            <CustomSlider
              title='Na jak dlouho'
              units='Měsíců'
              min={minM}
              max={maxM}
              step={1}
              initVal={initValM}
              helpS={{
                press: 'Povolené znaky jsou číslice',
                change: `Povolené hodnoty jsou v rozmezí od ${min} do ${max}.`,
              }}
              inputValue={termMonths}
              setInputValue={setTermMonths}
              under={(() => {
                const years = Math.floor(termMonths / 12)
                const extra = termMonths - years * 12
                return (
                  (years > 0
                    ? `${years} ${
                        ['rok', 'roky', 'let'][0 + (years > 1 ? 1 : 0) + (years > 4 ? 1 : 0)]
                      }`
                    : '') +
                  (extra > 0
                    ? ` a ${extra} ${
                        ['měsíc', 'měsíce', 'měsíců'][0 + (extra > 1 ? 1 : 0) + (extra > 4 ? 1 : 0)]
                      }`
                    : '')
                )
              })()}
            />
            <Row>
              <Col span={20}>
                <Title level={4}>Pojištění proti neschopnosti půjčku splácet</Title>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Radio.Group onChange={onChangeEnsurance} value={ensurance}>
                  <Space direction='horizontal'>
                    <Radio value={true}>S pojištěním</Radio>
                    <Radio value={false}>Bez pojištění</Radio>
                  </Space>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col span={21}>
                <ReactMarkdown>
                  {`Úroková sazba od **${rate} %** RPSN od **7.11 %** pojištění **${
                    ensure * (ensurance ? 1 : 0)
                  } ${units}/měsíčně**, poplatek za sjednání
                  online **0 ${units}**, celkem zaplatíte **${((months, calc) => {
                    return addSpacesToFloat(months * calc + ensure * (ensurance ? 1 : 0))
                  })(termMonths, calc)} ${units}**.`}
                </ReactMarkdown>
              </Col>
            </Row>
          </Form>
        </div>
        <Result>
          <Title level={4} style={{ color: 'white', margin: 'auto' }}>
            Měsíčně zaplatíte
          </Title>
          <Title level={1} style={{ color: 'white', margin: 'auto', fontWeight: 300 }}>
            {`${addSpacesToFloat(calc)} Kč`}
          </Title>
          <Button className='green-button'>POKRAČOVAT</Button>
        </Result>
      </div>
      <Paragraph>
        Výše uvedené splátky je pouze orientační a od výsledné schválené výše splátky se může lišit.
        Pokud si zvolíte delší ...
      </Paragraph>
    </div>
  )
}

const Result = styled.div`
  width: 20rem;
  background-color: #140757;
  display: flex;
  flex-direction: column;
  margin: 2rem;
`

export default Loan
