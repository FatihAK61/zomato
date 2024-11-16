import { View, StyleSheet, Modal } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const CustomModal = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState(null);

    useImperativeHandle(ref, () => ({
        openModal: (data: any) => {
            setContent(data);
            setVisible(true);
        },
        closeModal: () => {
            setVisible(false);
        }
    }))

    return (
        <Modal transparent visible animationType='slide' onRequestClose={() => setVisible(false)}>
            <View style={styles.modelContainer}>
                <View style={styles.modelContent}>

                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modelContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: '#000'
    }
})

export default CustomModal;
