import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShippingDetails {
  fullName: string;
  phoneNumber: string;
  altPhoneNumber: string;
  address: string;
  buildingNumber: string;
  floorNumber: string;
}

interface PaymentDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface CheckoutContextType {
  shippingDetails: ShippingDetails;
  setShippingDetails: (details: ShippingDetails) => void;
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  resetCheckout: () => void;
}

const initialShipping: ShippingDetails = {
  fullName: '',
  phoneNumber: '',
  altPhoneNumber: '',
  address: '',
  buildingNumber: '',
  floorNumber: '',
};

const initialPayment: PaymentDetails = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(initialShipping);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(initialPayment);

  const resetCheckout = () => {
    setShippingDetails(initialShipping);
    setPaymentDetails(initialPayment);
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingDetails,
        setShippingDetails,
        paymentDetails,
        setPaymentDetails,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
