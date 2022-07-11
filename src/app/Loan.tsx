import './index.css'
import { Col, Form, Radio, Row, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import CustomSlider from './Component/CustomSlider'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'

export const addSpaces = (num: number) => {
  const spaceAfter = 3
  const rev = num.toString().split('').reverse()
  for (let i = Math.floor((rev.length - 1) / spaceAfter); i > 0; i--) {
    rev.splice(spaceAfter * i, 0, ' ')
  }
  return rev.reverse().join('')
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

  const [amount, setAmount] = useState(initVal)
  const [termMonths, setTermMonths] = useState(initValM)
  const [ensurance, setEnsurance] = useState(false)
  const [calc, setCalc] = useState(0.0)

  const { Paragraph, Title } = Typography

  useEffect(() => {
    const getCalc = async () => {
      const { data } = (
        await axios.post('http://localhost:8190/calc', {
          amount: amount,
          rate: rate,
          termMonths: termMonths,
        })
      ).data as { data?: number; error?: string }
      setCalc(data || 0)
    }
    getCalc()
  }, [amount, termMonths, ensurance])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'row' }}>
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
                <Radio.Group onChange={e => setEnsurance(e.target.value)} value={ensurance}>
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
                    const comp = months * calc + ensure * (ensurance ? 1 : 0)
                    const arStr = comp.toFixed(2).split('.')
                    return [addSpaces(parseInt(arStr[0])), arStr[1]].join(',')
                  })(termMonths, calc)} ${units}**.`}
                </ReactMarkdown>
              </Col>
            </Row>
          </Form>
        </div>
        <div
          style={{
            width: '20rem',
            backgroundColor: '#140757',
            display: 'flex',
            flexDirection: 'column',
            margin: '2rem',
          }}
        >
          <Title level={4} style={{ color: 'white', margin: 'auto' }}>
            Měsíčně zaplatíte
          </Title>
          <Title level={1} style={{ color: 'white', margin: 'auto', fontWeight: 300 }}>
            {`${calc} Kč`}
          </Title>
        </div>
      </div>
      <Paragraph>
        Výše uvedené splátky je pouze orientační a od výsledné schválené výše splátky se může lišit.
        Pokud si zvolíte delší ...
      </Paragraph>
    </div>
  )
}

export default Loan
