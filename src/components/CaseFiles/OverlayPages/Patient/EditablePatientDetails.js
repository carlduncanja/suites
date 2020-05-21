import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView,KeyboardAvoidingView, TouchableOpacity } from "react-native";
import InputField2 from '../../../common/Input Fields/InputField2';
import OptionsField from '../../../common/Input Fields/OptionsField';
import Button from '../../../common/Buttons/Button';
import { formatDate, transformToSentence, calcAge, isValidEmail } from '../../../../utils/formatter';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';

const EditablePatientDetails = ({ fields, onFieldChange }) => {

    const emailTypes = ['primary', 'other', 'work']
    const phoneTypes = ['cell', 'home', 'work']
    const addressLines = ['line1', 'line2']

    const [phones, setPhones] = useState(fields['contactInfo'].phones)
    const [emails, setEmails] = useState(fields['contactInfo'].emails)
    const [addresses, setAddresses] = useState(fields['address'])  

    const [emergencyContacts, setEmergencyContacts] = useState(fields['contactInfo'].emergencyContact) 
    const [dateOfBirth, setDateOfBirth] = useState(formatDate(fields['dob'],'DD/MM/YYYY'))
    const [nextVisit, setNextVisit] = useState(formatDate(fields['nextVisit'],'DD/MM/YYYY'))

    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false)
    const [emergencyIndex, setEmergencyIndex] = useState(0)
    const [popoverList, setPopoverList] = useState([
        {
            name : "emergency1",
            status : false
        },
        {
            name : "emergency2",
            status : false
        }
    ])

    // ######## Helper Functions

    const formatTrn = (value) => {
        return value.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3")
    }

    const formatNumber = (value) => {
        return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")
    }

    const formatDOB = (date) => {
        const parts = date.split('/');
        const newDate = new Date(parts[2], parts[1] - 1, parts[0])
        return newDate
    }

    const formatEmergencyName = (name, relation) => {
        return (`${name} (${relation})`).trim()
    }

    const updatePhone = (newValue, phoneType) => {
        const objIndex = phoneValue.findIndex(obj => obj.type === phoneType);
        const updatedObj = { ...phoneValue[objIndex], phone: newValue};
        const updatedPhones = [
            ...phoneValue.slice(0, objIndex),
            updatedObj,
            ...phoneValue.slice(objIndex + 1),
        ]; 
        setPhoneValue(updatedPhones)
        return updatedPhones
    }

    const updateEmail = (newValue, emailType) => {
        const objIndex = emailValue.findIndex(obj => obj.type === emailType);
        const updatedObj = { ...emailValue[objIndex], email: newValue};
        const updatedEmails = [
            ...emailValue.slice(0, objIndex),
            updatedObj,
            ...emailValue.slice(objIndex + 1),
        ]; 
        setEmailValue(updatedEmails)
        return updatedEmails
    }

    const divider = <View style={{
            backgroundColor:'#CCD6E0',
            height:1,
            borderRadius:2,
            marginTop:8,
            marginBottom:38
        }}
    />

    // ######## Event Handlers

    const handlePhoneChange = (number, phoneType) => {
        let formattedNumber = number.replace(/\s/g,'')
        const updatedPhones = updatePhone(formatNumber(formattedNumber),phoneType)

        if (number === ""){
            onFieldChange('phones')(updatePhone("",phoneType))
        }else{
            if (/^\d{10}$/g.test(formattedNumber) || !number){
                onFieldChange('phones')(updatedPhones)
            }
        } 
    }

    const handleEmailChange = (email, emailType) => {
        const updatedEmails = updateEmail(email, emailType)

        if(email === ""){
            onFieldChange('emails')(updatedEmails)
        }else{
            if (isValidEmail(email) || !email){
                onFieldChange('emails')(updatedEmails)
            }
        }
        
    }

    const updatedAddress = (value, key, id) => {
        const objIndex = addresses.findIndex(obj => obj._id === id);
        if(key === 'line1'){
            updatedObj = { ...addresses[objIndex], line1: value}
        }else{
            updatedObj = { ...addresses[objIndex], line2: value}
        } 

        const updatedAddress = [
            ...addresses.slice(0, objIndex),
            updatedObj,
            ...addresses.slice(objIndex + 1),
        ]; 
        setAddresses(updatedAddress)
     
        onFieldChange('address')(updatedAddress)

    }
 
    const handleEmergency = (value, key, id) => {
        const objIndex = emergencyContacts.findIndex(obj => obj._id === id);
        let updatedObj = {}
        let updatedContacts = []

        if(key === 'name'){
            updatedObj = { ...emergencyContacts[objIndex], name : value}
            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ]; 

            onFieldChange('emergencyContact')(updatedContacts)

        }else if(key === 'relation'){

            if (value === "") {
                updatedObj = { ...emergencyContacts[objIndex], relation : ""}
            }else{
                // console.log("Value: ", value.trim())
                // let splitValue = value.trim().split(' ')
                
                // if (/\((\w)*\)/g.test(value)){
                //     console.log("Length 1")
                //     name = ""
                //     relation = value.replace(/[()]/g, "")
                // }else if(/\w*\s*\((\w)*\)/g.test(value.trim()) && splitValue.length === 2){
                //     console.log("Length 2")
                //     name = splitValue[0]
                //     relation = splitValue[1].replace(/[()]/g, "")
                // }else {
                //     name = splitValue[0].contact(' ', splitValue[1])
                //     relation = splitValue[2].replace(/[()]/g, "")
                // }

                updatedObj = { ...emergencyContacts[objIndex], relation : value.trim()}
            }
            
            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ]; 

            onFieldChange('emergencyContact')(updatedContacts)
            
        }else if( key === 'phone'){
            formattedNumber = value.replace(/\s/g,'')
            updatedObj = { ...emergencyContacts[objIndex], phone: formatNumber(formattedNumber)}

            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ]; 
            
            if (/^\d{10}$/g.test(formattedNumber) || !value){
                onFieldChange('emergencyContact')(updatedContacts)
            }

        }else{
            updatedObj = { ...emergencyContacts[objIndex], email: value}

            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ]; 

            if (isValidEmail(value) || !value){
                onFieldChange('emergencyContact')(updatedContacts)
            }
        }
        
        setEmergencyContacts(updatedContacts)
          
    }

    const handleDOB = (date) => {
        const updatedDob = formatDOB(date)
        if (/(\d{2})\/(\d{2})\/(\d{4})/g.test(date) || !date){
            onFieldChange('dob')(updatedDob)
        }
        setDateOfBirth(date)
    }
    const handleNextVisit = (date) => {
        const updatedDate = formatDOB(date)
        if (/(\d{2})\/(\d{2})\/(\d{4})/g.test(date) || !date){
            onFieldChange('nextVisit')(updatedDate)
        }
        setNextVisit(date)
    }

    const openEmergencyName = (index) =>{
        console.log("E indexx:", index)
        setEmergencyIndex(index)
        setIsEmergencyOpen(!isEmergencyOpen)
    }

    const onAddEmergency = ()=>{
        let updatedEmergency = [...emergencyContacts,{
            email : '',
            name : '',
            phone : '',
            relation : ''
        }]
        setEmergencyContacts(updatedEmergency)
    }

    const handlePopovers = (popoverValue) => (popoverItem) =>{
        if(!popoverItem){
            updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})
            
            // setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ]; 
            // setPopoverList(updatedPopovers)
        }
        setPopoverList(updatedPopovers)
    
    }

    const demoData = <>

        <View style={styles.row}>

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>First Name</Text>
                </View>

                <View style={styles.inputWrapper}> 
                    <InputField2
                        onChangeText = {onFieldChange('firstName')}
                        value = {fields['firstName']}
                        onClear = {()=>onFieldChange('firstName')('')}
                    />
                </View>
            </View>
            
            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Middle Name</Text>
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        onChangeText = {onFieldChange('middleName')}
                        value = {fields['middleName']}
                        onClear = {()=>{onFieldChange('middleName')('')}}
                    />
                </View>
            </View>


            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Surname</Text>
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        onChangeText = {onFieldChange('surName')}
                        value = {fields['surName']}
                        onClear = {()=>{onFieldChange('surName')('')}}
                    />
                </View>
            </View>

        </View>

        <View style={styles.row}>

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Height</Text>
                </View>

                <View style={styles.inputWrapper}> 
                    <InputField2
                        onChangeText = {onFieldChange('height')}
                        value = {fields['height'].toString()}
                        onClear = {()=>onFieldChange('height')('')}
                    />
                </View>
            </View>

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Weight</Text>
                </View>

                <View style={styles.inputWrapper}> 
                    <InputField2
                        onChangeText = {onFieldChange('weight')}
                        value = {fields['weight'].toString()}
                        onClear = {()=>onFieldChange('weight')('')}
                    />
                </View>
            </View>

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>BMI</Text>
                </View>
                <View style={styles.inputWrapper}> 
                    {/* <Text>{calcBmi() || 0}</Text> */}
                    <Text>Calc BMI</Text>
                </View>
            </View>


         </View>

        <View style={styles.row}>

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>DOB</Text>
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        onChangeText = {(value)=>handleDOB(value)}
                        value = {dateOfBirth}
                        onClear = {()=>{handleDOB('')}}
                        placeholder = {"DD/MM/YYYY"}
                    />
                </View>
            </View>



            {/* <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Age</Text>
                </View>
                <View style={styles.inputWrapper}> 
                    <Text>{calcAge(new Date(fields['dob'])) || 0}</Text>
                </View>
            </View> */}

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>TRN</Text>
                </View>
                <View style={styles.inputWrapper}> 
                    <Text>{formatTrn(fields['trn'])}</Text>
                </View>
            </View>

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Gender</Text>
                </View>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        text={transformToSentence(fields['gender'])}
                        // text = {(fields['gender'])}
                        oneOptionsSelected={onFieldChange('gender')}
                        menuOption={<MenuOptions>
                            <MenuOption value={'male'} text='Male'/>
                            <MenuOption value={'female'} text='Female'/>
                        </MenuOptions>}
                    />
                </View>
            </View>


        </View>
    
        <View style={styles.row}>
            
            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Ethnicity</Text>
                </View>

                <View style={styles.inputWrapper}> 
                    <InputField2
                        onChangeText = {onFieldChange('ethnicity')}
                        value = {fields['ethnicity']}
                        onClear = {()=>onFieldChange('ethnicity')('')}
                    />
                </View>
            </View>

            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Blood Type</Text>
                </View>

                <View style={styles.inputWrapper}> 
                    <InputField2
                        onChangeText = {onFieldChange('bloodType')}
                        value = {fields['bloodType']}
                        onClear = {()=>onFieldChange('bloodType')('')}
                    />
                </View>
            </View>
            
            <View style={styles.fieldWrapper}>
                <View style={{ marginBottom:5}}>
                    <Text style={styles.title}>Next Visity</Text>
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        onChangeText = {(value)=>handleNextVisit(value)}
                        value = {nextVisit}
                        onClear = {()=>{handleNextVisit('')}}
                        placeholder = {"DD/MM/YYYY"}
                    />
                </View>
            </View>
           

        </View>

    </>

    const contactData = <>
        
        <View style={styles.row}>

            {phoneTypes.map(( type, index)=>{
                const phoneArray = phones.filter( phone => phone.type === type)
                phoneArray.length === 0 ? phone = "" : phone = phoneArray[0].phone

                type === 'cell' ? title = "Cell Phone Number" :
                type === 'home' ? title = "Home Phone Number" :
                type === 'work' ? title = "Work Phone Number" :
                type = "Other Phone Number"

                return (
                    <View style={styles.fieldWrapper} key={index}>
                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>{title}</Text>
                        </View>

                        <View style={styles.inputWrapper}> 
                            <InputField2
                                onChangeText = {(value)=>handlePhoneChange(value, type)}
                                value = {formatNumber(phone)}
                                onClear = {()=>handlePhoneChange("",type)}
                                keyboardType = "number-pad"
                            />
                        </View>
                    </View>

                )
            })}
        </View>

        <View style={styles.row}>

            {emailTypes.map(( type, index)=>{
                const emailArray = emails.filter( email => email.type === type)
                emailArray.length === 0 ? email = "" : email = emailArray[0].email

                type === 'primary' ? title = "Primary Email" :
                type === 'other' ? title = "Alternate Email" :
                type === 'work' ? title = "Work Email" :
                title = "Other"

                return (
                    <View style={styles.fieldWrapper} key={index}>
                        <View style={{ marginBottom:5}}>
                            <Text style={styles.title}>{title}</Text>
                        </View>

                        <View style={styles.inputWrapper}> 
                            <InputField2
                                onChangeText = {(value)=>handleEmailChange(value, type)}
                                value = {email}
                                onClear = {()=>handleEmailChange("",type)}
                                keyboardType = "email-address"
                            />
                        </View>
                    </View>

                )
            })}
       
        </View>

        <View style={{}}>
            {addresses.map(( addressObj, index)=>{
                return (
                    <View key={index} style={{flexDirection:'row', flex:1}}>

                        <View style={[{paddingRight:35, width:'33%', marginBottom:30}]}>
                            <View style={{ marginBottom:5}}>
                                <Text style={styles.title}>Address 1</Text>
                            </View>

                            <View style={styles.inputWrapper}> 
                                <InputField2
                                    onChangeText = {(value)=>updatedAddress(value, 'line1', addressObj._id)}
                                    value = {addressObj.line1}
                                    onClear = {()=>{updatedAddress("",'line1', addressObj._id)}}
                                />
                            </View>
                        </View>

                        <View style={styles.fieldWrapper}>
                            <View style={{ marginBottom:5}}>
                                <Text style={styles.title}>Address 2</Text>
                            </View>

                            <View style={styles.inputWrapper}> 
                                <InputField2
                                    onChangeText = {(value)=>updatedAddress(value, 'line2', addressObj._id)}
                                    value = {addressObj.line2}
                                    onClear = {()=>{updatedAddress("",'line2', addressObj._id)}}
                                />
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>

    </>
        
    const emergencyContactData = <>
        <View style={{}}>
            {emergencyContacts.map(( contact, index)=>{
                let isOpen = popoverList.filter(item => item.name === `emergency${index + 1}`)
                return(
                    <View style={{flexDirection:"row",width:'100%', zIndex: index === 1 ? -1 :0}} key = {index}>
                      
                        <TouchableOpacity 
                            style={{paddingRight:35, width:'33%', marginBottom:30, zIndex:1}}
                            onPress = {()=>{openEmergencyName(index); handlePopovers(true)(`emergency${index + 1}`)}}
                            activeOpacity = {1}
                        >
                            <View style={{ marginBottom:5}}>
                                <Text style={[styles.title,{fontSize:12}]}>Emergency Contact Name {index + 1}</Text>
                            </View>

                            <View style={[styles.inputWrapper]}> 
                                {/* <View style={styles.inputField}>
                                    <Text>
                                        {`${contact.name} (${contact.relation})`}
                                    </Text>
                                </View> */}
                                
                                <InputField2
                                    onChangeText = {()=>{}}
                                    value = {`${contact.name} (${contact.relation})`}
                                    onClear = {()=>{}}
                                /> 
                                { isEmergencyOpen && index === emergencyIndex && isOpen[0].status &&
                                    <View style={styles.modalContainer}>
                                        <InputField2
                                            label = "Name"
                                            onChangeText = {(value)=>handleEmergency(value, 'name', contact._id )}
                                            value = {contact.name}
                                            onClear = {()=>handleEmergency('', 'name', contact._id)}
                                        /> 
                                       
                                        <InputField2
                                            label = "Relation"
                                            onChangeText = {(value)=>handleEmergency(value, 'relation', contact._id )}
                                            value = {contact.relation}
                                            onClear = {()=>handleEmergency('', 'relation', contact._id)}
                                        /> 

                                    </View>
                                }
                            </View>
                        </TouchableOpacity>

                        <View style={{paddingRight:35, width:'33%', marginBottom:30, zIndex:-1}} >
                            <View style={{ marginBottom:5}}>
                                <Text style={[styles.title,{fontSize:13}]}>Emergency Contact Phone {index + 1}</Text>
                            </View>

                            <View style={styles.inputWrapper}> 
                                <InputField2
                                    onChangeText = {(value)=>handleEmergency(value, 'phone', contact._id)}
                                    value = {contact.phone}
                                    onClear = {()=>handleEmergency('', 'phone', contact._id)}
                                    keyboardType = 'number-pad'
                                />
                            </View>
                        </View>

                        <View style={{paddingRight:35, width:'33%', marginBottom:30, zIndex:-2}} >
                            <View style={{ marginBottom:5}}>
                                <Text style={[styles.title,{fontSize:12}]}>Emergency Contact Email {index + 1}</Text>
                            </View>

                            <View style={styles.inputWrapper}> 
                                <InputField2
                                    onChangeText = {(value)=>handleEmergency(value, 'email', contact._id)}
                                    value = {contact.email}
                                    onClear = {()=>handleEmergency('', 'email', contact._id)}
                                    keyboardType = "email-address"
                                />
                            </View>
                        </View>

                    </View>
                    
                )
            })}
            {
                emergencyContacts.length < 2 &&
                    <View style={{zIndex:-1,padding:15, paddingTop:10, paddingBottom:10, backgroundColor:'#83AED1', alignSelf:'center', alignItems:'center'}}>
                        <Button
                            title = "Add Emergency Contact"
                            backgroundColor="#83AED1"
                            color="#FFFFFF"
                            buttonPress = {()=>{onAddEmergency()}}
                        />
                    </View>
                    
            }
        </View>
    </>
        
   return (
        <KeyboardAvoidingView
            style={{ flex: 1}}
            enabled   
            keyboardVerticalOffset={300}
            behavior={'padding'}
        >
            <ScrollView
                bounces = {true}
                // fadingEdgeLength = {100}
                contentContainerStyle={{paddingBottom:40}}
            >
                <TouchableOpacity
                    activeOpacity = {1}
                    onPress = {()=>handlePopovers(false)()}
                >
                    {demoData}
                    {divider}
                    {contactData}
                    {divider}
                    {emergencyContactData}
                </TouchableOpacity>
                

            </ScrollView>
        </KeyboardAvoidingView>
        

    )
}

EditablePatientDetails.propTypes = {};
EditablePatientDetails.defaultProps = {};

export default EditablePatientDetails

const styles = StyleSheet.create({
    section:{
    },
    row:{
        flexDirection:'row',
    },
    fieldWrapper:{
        flex:1,
        marginRight:35,
        marginBottom:30,
        flexDirection:'column'
    },
    inputWrapper:{
        height:30,
        justifyContent:'center'
    },
    title:{
        color:'#718096',
        fontSize:16,
        // marginBottom:5
    },
    modalContainer:{
        position:'absolute', 
        padding:10, 
        backgroundColor:'#FFFFFF', 
        width:300, 
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
    },
    inputField:{
        flex:1,
        justifyContent:'center',
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        padding:10, 
        paddingBottom:2, 
        paddingTop:2
    }

})