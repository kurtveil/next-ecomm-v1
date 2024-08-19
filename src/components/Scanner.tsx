// Scanner.tsx
import React, { useEffect, useCallback } from 'react';
import Quagga from '@ericblade/quagga2';

interface ScannerProps {
  onDetected: (result: any) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  const handleDetected = useCallback(
    (result: any) => {
        console.log(result);
        
      onDetected(result);
    },
    [onDetected]
  );

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // or 'user' for front camera
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['ean_reader'], // You can add more readers here
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error('Error initializing Quagga:', err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop(); // Stop scanning when the component unmounts
    };
  }, [handleDetected]);

  return (
    <div
      id="interactive"
      className="viewport"
      style={{ width: '410px', height: '280px', margin: '0 auto' }}
    />
  );
};

export default Scanner;
