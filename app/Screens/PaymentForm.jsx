import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Button, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';

const PaymentForm = ({ navigation, route }) => {
  const [isCardPayment, setIsCardPayment] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardError, setCardError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const isdisabled = true;
  const SelectedDate = route.params.SelectedDate;
  const SelectedSlot = route.params.SelectedSlot;
  const doc = route.params.doc;
  const Type = route.params.Type;
  const Dateformat = route.params.Dateformat;
  const [disabled, setdisabled] = useState(true);

  console.log("Selected Date" + SelectedDate)

  const handleCardNumberChange = (value) => {
    if (value.length <= 16) {
      setCardNumber(value);
      setCardError('');
    }
  };

  const handleCvvChange = (value) => {
    if (value.length <= 3) {
      setCvv(value);
      setCvvError('');
    }
  };

  const validateCardNumber = () => {
    if (!cardNumber) {
      setCardError('Please enter a valid card number');
    } else if (cardNumber.length !== 16) {
      setCardError('Please enter a 16-digit card number');
    } else if (!/^[0-9]+$/.test(cardNumber)) {
      setCardError('Please enter only numbers for the card number');
    } else {
      setCardError('');
    }

  };

  const validateCvv = () => {
    if (!cvv) {
      setCvvError('Please enter a valid CVV number');
    } else if (cvv.length !== 3) {
      setCvvError('Please enter a 3-digit CVV number');
    } else if (!/^[0-9]+$/.test(cvv)) {
      setCvvError('Please enter only numbers for the CVV number');
    } else {
      setCvvError('');
    }
  };

  const handleSubmit = () => {
    const checkoutNavigation = route.params.checkoutNavigation;
    if (isCardPayment) {
      validateCardNumber();
      validateCvv();
      if (!cardError && !cvvError) {
        navigation.replace('Checkout', { SelectedDate, SelectedSlot, isCardPayment, cardNumber, doc, Type, Dateformat });

      }
    } else if (isCardPayment = 'Cash' && cardError && cvvError) {


      navigation.replace('Checkout', { SelectedDate, SelectedSlot, isCardPayment, doc, Type, Dateformat });

    }

  };
  useEffect(() => {
    const CheckButton = () => {
      if (isCardPayment == "Cash") {
        setdisabled(false);
      }
      else if (isCardPayment == 'card' && !cardError && !cvvError) {
        setdisabled(false)
      }
      else {
        setdisabled(true)
      }


    }
    CheckButton();

  }, [isCardPayment, cardError, cvvError]);

  return (
    <View style={styles.container}>

      <View style={{ marginTop: 40 }}>
        <Text style={styles.label}>Payment Method</Text>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="Cash"
              status={isCardPayment === 'Cash' ? 'checked' : 'unchecked'}
              onPress={() => setIsCardPayment('Cash')}
            />
            <Text>Cash</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="card"
              status={isCardPayment === 'card' ? 'checked' : 'unchecked'}
              onPress={() => setIsCardPayment('card')}
            />
            <Text>Card</Text>
          </View>
        </View>
      </View>


      {isCardPayment == 'card' && (
        <View>
          <View style={styles.field}>
            <Text style={styles.label}>Card Number</Text>
            {cardError ? null : <Image source={require('../assets/card.png')} style={{ width: 40, height: 40, resizeMode: 'contain', top: 40 }} />}
            <TextInput
              keyboardType="numeric"
              maxLength={16}
              onChangeText={handleCardNumberChange}
              onBlur={validateCardNumber}
              value={cardNumber}
              style={[styles.input, { paddingLeft: 40 }]}
            />

          </View>
          {cardError ? <Text style={styles.error}>{cardError}</Text> : null}
          <View style={styles.field}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              onChangeText={handleCvvChange}
              onBlur={validateCvv}
              value={cvv}
              style={styles.input}
            />
          </View>
          {cvvError ? <Text style={styles.error}>{cvvError}</Text> : null}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Pay" onPress={handleSubmit} disabled={disabled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
  field: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default PaymentForm;
