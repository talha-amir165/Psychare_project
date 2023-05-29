import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import appointmentService from '../services/AppointmentService';
import RNFS from 'react-native-fs';








import DocumentPicker from 'react-native-document-picker'


function DocumentUploadPage({ route, navigation }) {

    const userData = useSelector(state => state.user.userData);
    const [loading, setLoading] = useState(false);
    const [disabled, setdisabled] = useState(true);


    const [FileName, setFileName] = useState('');
    const [BlobFile, setBlobFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);


    const UploadFile = () => {
        if (!BlobFile) return;
        setLoading(true);
        setdisabled(true);
        const sotrageRef = ref(storage, `Reports/${FileName}.pdf`); //LINE A
        const uploadTask = uploadBytesResumable(sotrageRef, BlobFile); //LINE B
        uploadTask.on(
            "state_changed", null,
            (error) => console.log(error + "here"),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { //LINE C
                    console.log("File available at", downloadURL);

                    setFileName('');
                    appointmentService.updateAppointment(Details._id, {
                        records: downloadURL
                    }).then(response => {
                        console.log(response)
                        setReports(response.records);
                        setLoading(false);


                    }
                    )
                        .catch(err => {
                            console.log(err)
                            setLoading(false);
                        }
                        )



                    return downloadURL
                });
            }
        );
    }

    const handleSendDocument = (downloadUrl) => {
        // Send the document to another user
    };

    const handleSelectDocument = (downloadUrl) => {
        // View the document
    };
    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: DocumentPicker.types.pdf,
            });

            setFileName(res[0].name);
            const fileContent = await RNFS.readFile(res[0].uri, 'base64');
            const blob = new Blob([fileContent], { type: 'application/pdf' });
            setBlobFile(blob)



            setdisabled(false)
            console.log(res.uri)
            console.log(res)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the file picking.');
            } else {
                console.log('Error picking file:', err);
            }
        }
    };

    const renderDocumentItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSelectDocument(item.downloadUrl)}>
            <Text>{item.name}</Text>
            <Button title="Send" onPress={() => handleSendDocument(item.downloadUrl)} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {loading && <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 250 }}><ActivityIndicator size="large" color="skyblue" /></View>}

            <View style={styles.uploadButtonContainer}>

                {FileName && <Text>{FileName}</Text>}


                <Button title="Choose file" onPress={pickDocument} />
                <View style={{ margin: 5 }}></View>
                <Button title="Upload" disabled={disabled} onPress={UploadFile} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    uploadButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default DocumentUploadPage;
