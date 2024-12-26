import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import {
  Surface,
  Text,
  Button,
  Card,
  TextInput,
  Portal,
  Dialog,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { selectActiveSession, selectUnlockFee, unlockSession, incrementUnlockAttempt } from '../store/slices/lockSessionSlice';
import { fadeIn, slideUp } from '../utils/animations';

const PaymentScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const activeSession = useSelector(selectActiveSession);
  const unlockFee = useSelector(selectUnlockFee);
  
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideUp(slideAnim);
  }, []);

  useEffect(() => {
    if (!activeSession?.isLocked) {
      navigation.replace('Dashboard');
    }
  }, [activeSession]);

  const formatTimeLeft = () => {
    if (!activeSession) return '';
    const timeLeft = activeSession.endTime - Date.now();
    const minutes = Math.floor(timeLeft / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    return hours > 0 
      ? `${hours}h ${minutes % 60}m`
      : `${minutes}m`;
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual payment processing with your payment API
      // For now, we'll simulate a payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      const paymentId = 'PAYMENT_' + Date.now();
      dispatch(unlockSession({ paymentId }));
      
      Alert.alert(
        'Success',
        'Your apps have been unlocked successfully!',
        [{ text: 'OK', onPress: () => navigation.replace('Dashboard') }]
      );
    } catch (error) {
      Alert.alert(
        'Payment Failed',
        'Please try again or use a different payment method.',
        [{ text: 'OK' }]
      );
      dispatch(incrementUnlockAttempt());
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const validateCard = () => {
    if (cardNumber.length < 16) {
      Alert.alert('Invalid Card', 'Please enter a valid card number');
      return false;
    }
    if (expiryDate.length < 5) {
      Alert.alert('Invalid Date', 'Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (cvv.length < 3) {
      Alert.alert('Invalid CVV', 'Please enter a valid CVV');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <LinearGradient
          colors={['#4834d4', '#686de0']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.headerTitle}>Unlock Apps</Text>
          <Text style={styles.headerSubtitle}>
            Time remaining: {formatTimeLeft()}
          </Text>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <Card style={styles.warningCard}>
            <Card.Content>
              <View style={styles.warningHeader}>
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={24}
                  color="#FF6B6B"
                />
                <Text style={styles.warningTitle}>Early Unlock Fee</Text>
              </View>
              <Text style={styles.warningText}>
                To unlock your apps before the session ends, you'll need to pay a fee of ${unlockFee.toFixed(2)}.
                This helps maintain accountability and commitment to your focus goals.
              </Text>
            </Card.Content>
          </Card>

          <Surface style={styles.paymentForm}>
            <TextInput
              label="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
              mode="outlined"
              style={styles.input}
            />
            <View style={styles.row}>
              <TextInput
                label="Expiry Date"
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="MM/YY"
                mode="outlined"
                style={[styles.input, styles.halfInput]}
              />
              <TextInput
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                mode="outlined"
                style={[styles.input, styles.halfInput]}
              />
            </View>

            <Button
              mode="contained"
              onPress={() => validateCard() && setShowConfirm(true)}
              style={styles.payButton}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                `Pay $${unlockFee.toFixed(2)}`
              )}
            </Button>
          </Surface>

          <Text style={styles.secureText}>
            🔒 Payments are secure and encrypted
          </Text>
        </ScrollView>

        <Portal>
          <Dialog visible={showConfirm} onDismiss={() => setShowConfirm(false)}>
            <Dialog.Title>Confirm Payment</Dialog.Title>
            <Dialog.Content>
              <Text>
                Are you sure you want to unlock your apps early? This will charge your card ${unlockFee.toFixed(2)}.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowConfirm(false)}>Cancel</Button>
              <Button onPress={handlePayment}>Confirm Payment</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  warningCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#FF6B6B',
  },
  warningText: {
    color: '#666',
    lineHeight: 20,
  },
  paymentForm: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  payButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  secureText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
  },
});

export default PaymentScreen;
