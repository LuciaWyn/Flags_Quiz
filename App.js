import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TextInput, Button, Modal, FlatList } from 'react-native';

export default function App() {
  const [arr1, arr2] = useState([{id:0, flag:'🇦🇫', country:'Afghanistan'},{id:1,  flag:'🇸🇦', country:'Saudi Arabia'},{id: 2, flag:'🇸🇾', country: 'Syria'},{id:3, flag:'🇨🇾', country: 'Cyprus'},{id:4, flag:'🇬🇷', country:'Greece'},{id:5, flag:'🇮🇹', country:'Italy'}]);
  const [intxt, changetxt] = useState('');
  const [no, count] = useState(Math.floor(Math.random()*5));
  const [flag, fl] = useState(arr1[no].flag);
  const [country, cou] = useState(arr1[no].country);
  const [an, answers] = useState([]);
  const [questionsan, answered] = useState(0);
  const questionsno = 10;
  const [right, correct] = useState(0);
  const [quiz, quized] = useState(true);
  const [seans, seeanswers] = useState(false);
  
  const answer = (country, txt, num) =>{
    changetxt('')
    let answ = {id: questionsan, correct: country, your: txt, right:''};
    if(country === txt){
      alert('correct');
      answ.right = '✔️';
      correct(right=>right+1);
    }
    else{
      alert('false');
      answ.right = '❌';
    }
    answers(an=>[...an, answ]);
    if((questionsan+1) === questionsno){
      quized(false);
      seeanswers(true);
    }
    else{
      num = Number(num);
      console.log(num);
      if(num === (arr1.length-1)){
        count(0)
        fl(arr1[0].flag)
        cou(arr1[0].country)
      }
      else{
        num = num+1;
        count(num)
        fl(arr1[num].flag)
        cou(arr1[num].country)
      }
    }
    answered(questionsan=>questionsan+1);
  };
  return(
    <View>
      <Modal visible={quiz}>
        <View style={styles.container}>
          <Text style={styles.counter}>{questionsan}/{questionsno}</Text>
          <Text style={{fontSize: 75}}>{flag}</Text>
          <Text>Which Country is this?</Text>
          <TextInput placeholder='Country' style={styles.inp} onChangeText={changetxt} value={intxt.toString()}/>
          <Button title='enter' onPress={()=>{answer(country, intxt, parseInt(no))}}/>
        </View>
      </Modal>
      <Modal visible={seans}>
        <View style={styles.container}>
          <View style={styles.tableWrap}>
            <Text style={styles.side}></Text>
            <Text style={styles.middle}>Your Answer</Text>
            <Text style={styles.middle}>Correct Answer</Text>
            <Text style={styles.side}></Text>
          </View>
          <FlatList
            style={{width: '100%'}}
            keyExtractor={(item, index)=> item.id}
            data={an} 
            renderItem={itemData => (
              <View style={styles.tableWrap}>
                <Text style={styles.side}>{itemData.item.id+1}</Text>
                <Text style={styles.middle}>{itemData.item.your}</Text>
                <Text style={styles.middle}>{itemData.item.correct}</Text>
                <Text style={styles.side}>{itemData.item.right}</Text>
              </View>
            )}
          >
          </FlatList>
          <Text style={{color:'red', alignItems: 'center', paddingBottom:20, fontSize:30}}>You Scored</Text>
          <Text style={{color:'red', alignItems: 'center', paddingBottom:20, fontSize:30}}>{right}/{questionsno}</Text>
        </View>
      </Modal>
    <StatusBar style="auto" />
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inp:{
    width: '80%',
    padding: 3,
    justifyContent: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 20,
  },
  counter:{
    color: 'red',
    fontSize: 25,
    justifyContent: 'center',
    alignItems:'flex-start'
  },
  row:{
    flexDirection: 'column'
  },
  side:{
    width: '8%',
    borderWidth: 1,
    padding: 3
  },
  middle:{
    width: '42%',
    borderWidth: 1,
    padding: 3
  },
  tableWrap:{
    flexDirection:'row', flexWrap:'wrap', width: '100%'
  }
});
