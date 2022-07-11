import { Col, Form, InputNumber, Row, Slider } from 'antd'
import { MarkObj } from 'rc-slider/lib/Marks'
import { ValidateStatus } from 'antd/lib/form/FormItem'
import React, { KeyboardEvent, ReactNode, useState } from 'react'

type Props = {
  units: string
  min: number
  max: number
  helpS: { press: string; change: string }
  step: number
  initVal: number
}

const addSpaces = (num: number) => {
  const spaceAfter = 3
  const rev = num.toString().split('').reverse()
  for (let i = Math.floor(rev.length / spaceAfter); i > 0; i--) {
    rev.splice(spaceAfter * i, 0, ' ')
  }
  return rev.reverse().join('')
}

const CustomSlider = ({ units, min, max, helpS, step, initVal }: Props) => {
  const marks: Record<string | number, ReactNode | MarkObj> = {}
  marks[min] = addSpaces(min) + ' ' + units
  marks[max] = addSpaces(max) + ' ' + units
  const [inputValue, setInputValue] = useState(initVal)
  const [error, setError] = useState<ValidateStatus>()
  const [help, setHelp] = useState('')
  const onChange = (newValue: number) => {
    console.info(newValue)
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
    <Form>
      <Row>
        <Col span={12}>
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
        <Col span={4}>
          <Form.Item validateStatus={error} help={help}>
            <InputNumber
              min={min}
              max={max}
              style={{
                margin: '0 16px',
              }}
              value={typeof inputValue === 'number' ? inputValue : min}
              onKeyPress={onKeyPress}
              onChange={onChange}
            />
          </Form.Item>
        </Col>
        <Col span={1}>{units}</Col>
      </Row>
    </Form>
  )
}
export default CustomSlider
