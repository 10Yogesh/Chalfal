import React, {useState} from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Email = ({onNext}) => {
  const [email, setEmail] = useState('')
  return (
    
    <Card title="Enter Your Email" icon="email">
      <TextInput value={email} onChange={(e)=> setEmail(e.target.value)}></TextInput>
      <div>
          <div className={styles.actionButtonWrap}>
              <Button text = "Next" onClick={onNext}></Button>
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
      </div>
    </Card>
  )
}

export default Email