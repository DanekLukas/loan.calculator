import './index.css'
import { Col, Form, Radio, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import CustomSlider from './Component/CustomSlider'

const Loan = () => {
  const min = 20000
  const max = 800000
  const initVal = 100000
  const minM = 24
  const maxM = 96
  const initValM = 48

  const [loan, setLoan] = useState<number>(initVal)
  const [paid, setPaid] = useState<number>(initValM)
  const [ensurance, setEnsurance] = useState(false)

  const { Paragraph, Title } = Typography

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
              units='Kč'
              min={min}
              max={max}
              step={1000}
              initVal={initVal}
              helpS={{
                press: 'Povolené znaky jsou číslice',
                change: `Povolené hodnoty jsou v rozmezí od ${min} do ${max}.`,
              }}
              inputValue={loan}
              setInputValue={setLoan}
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
              inputValue={paid}
              setInputValue={setPaid}
              under={(() => {
                const years = Math.floor(paid / 12)
                return years > 1
                  ? years + [' rok', ' roky', ' let'][0 + (years > 1 ? 1 : 0) + (years > 4 ? 1 : 0)]
                  : undefined
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
                <Paragraph style={{ marginTop: '2rem' }}>
                  Úroková sazna od 6 % RPSN od 7 % pojištění 0 Kč/měsíčně, poplatek za sjednání
                  online 0 Kč, celkem zaplatíte 130 406,44 Kč.
                </Paragraph>
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
            Kč
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
