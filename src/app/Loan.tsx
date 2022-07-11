import './index.css'
import CustomSlider from './Component/CustomSlider'

const Loan = () => {
  const min = 20000
  const max = 800000
  const minM = 24
  const maxM = 96
  return (
    <>
      <CustomSlider
        units='Kč'
        min={min}
        max={max}
        step={1000}
        initVal={100000}
        helpS={{
          press: 'Povolené znaky jsou číslice',
          change: `Povolené hodnoty jsou v rozmezí od ${min} do ${max}.`,
        }}
      />
      <CustomSlider
        units='Měsíců'
        min={minM}
        max={maxM}
        step={1}
        initVal={48}
        helpS={{
          press: 'Povolené znaky jsou číslice',
          change: `Povolené hodnoty jsou v rozmezí od ${min} do ${max}.`,
        }}
      />
    </>
  )
}

export default Loan
