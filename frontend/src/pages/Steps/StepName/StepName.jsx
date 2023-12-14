import React, { useState }  from 'react'
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';


const StepName = ({onNext}) => {

  const {name}= useSelector((state)=>state.activate)
  const dispatch = useDispatch()
  const [fullname, setFullName] = useState(name)


  function nextStep(){
    if(!fullname){
      return alert("Enter your name")
    }

    dispatch(setName(fullname))
    onNext()

  }
  return (
    <>
                <Card title="What’s your full name?" icon="name">
                    <TextInput
                        value={fullname}
                        onChange={(e)=> setFullName(e.target.value)}
                    />
                    <br />
                    
                    <p className={styles.bottomParagraph}>
                        People use real names at Chalfal :) 
                    </p>

                    <br />

                    <div className={styles.actionButtonWrap}>
                        <Button onClick={nextStep} text="Next" />
                    </div>
                </Card>
    </>
  )
}

export default StepName