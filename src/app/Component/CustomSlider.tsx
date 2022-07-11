import { Col, Form, InputNumber, Row, Slider, Typography } from 'antd'
import { Dispatch, KeyboardEvent, ReactNode, SetStateAction, useState } from 'react'
import { MarkObj } from 'rc-slider/lib/Marks'
import { ValidateStatus } from 'antd/lib/form/FormItem'

type Props = {
  title: string
  units: string
  min: number
  max: number
  helpS: { press: string; change: string }
  step: number
  initVal: number
  inputValue: number
  setInputValue: Dispatch<SetStateAction<number>>
  under?: ReactNode
}

const addSpaces = (num: number) => {
  const spaceAfter = 3
  const rev = num.toString().split('').reverse()
  for (let i = Math.floor(rev.length / spaceAfter); i > 0; i--) {
    rev.splice(spaceAfter * i, 0, ' ')
  }
  return rev.reverse().join('')
}

const CustomSlider = ({
  title,
  units,
  min,
  max,
  helpS,
  step,
  inputValue,
  setInputValue,
  under,
}: Props) => {
  const { Title } = Typography
  const marks: Record<string | number, ReactNode | MarkObj> = {}
  marks[min] = (
    <div style={{ width: 'fit', marginLeft: '3.5rem' }}>{addSpaces(min) + ' ' + units}</div>
  )
  marks[max] = (
    <div style={{ width: '5rem', marginLeft: '-3.5rem' }}>{addSpaces(max) + ' ' + units}</div>
  )
  const [error, setError] = useState<ValidateStatus>()
  const [help, setHelp] = useState('')
  const onChange = (newValue: number) => {
    if (newValue < min || newValue > max) {
      setError('error')
      setHelp(helpS.change)
      setTimeout(() => {
        setError(undefined)
        setHelp('')
      }, 1000)
      return
    }
    setInputValue(newValue)
  }
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const val = parseInt(e.key)
    if (isNaN(val)) {
      setError('error')
      setHelp(helpS.press)
      setTimeout(() => {
        setError(undefined)
        setHelp('')
      }, 1000)
      e.preventDefault()
      return false
    }
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={4}>{title}</Title>
        </Col>
      </Row>
      <Row>
        <Col span={17}>
          <Slider
            min={min}
            max={max}
            step={step}
            tooltipVisible={false}
            onChange={onChange}
            marks={marks}
            value={typeof inputValue === 'number' ? inputValue : min}
          ></Slider>
        </Col>
        <Col span={5}>
          <Form.Item validateStatus={error} help={help}>
            <InputNumber
              min={min}
              max={max}
              style={{
                margin: '0 16px',
                width: '7rem',
              }}
              value={typeof inputValue === 'number' ? inputValue : min}
              onKeyPress={onKeyPress}
              onChange={onChange}
            />
          </Form.Item>
        </Col>
        <Col span={1}>{units}</Col>
      </Row>
      {under && (
        <Row>
          <Col span={16}></Col>
          <Col span={1}>{under}</Col>
        </Row>
      )}
    </>
  )
}
export default CustomSlider
