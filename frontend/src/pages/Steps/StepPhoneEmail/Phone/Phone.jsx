import React, {useState} from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'
import { sendOtp } from '../../../../http/index'
import {useDispatch} from 'react-redux'
import { setOTP } from '../../../../store/authSlice'


const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const dispatch = useDispatch();

    async function submit(){
      //server request
       if(!phoneNumber) return alert("Enter your phone Number")
       const {data} = await sendOtp({phone: phoneNumber});
       console.log(data)
       dispatch(setOTP({phone: data.phone, hash: data.hash}))

      onNext();


    }

  return (
    <Card title="Enter Your Phone Number" icon="phone">
      <TextInput value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}></TextInput>
      <div>
          <div className={styles.actionButtonWrap}>
              <Button text = "Next" onClick={submit}></Button>
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
      </div>
    </Card>
  )
}

export default Phone