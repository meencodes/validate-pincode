import React, { useState } from 'react';
import './App.css'

function validatePincode(pincode) {
  // ตรวจสอบความยาวของ pincode
  if (pincode.length < 6) {
    return false;
  }

  // ตรวจสอบเลขซ้ำติดกันเกิน 2 ตัว
  for (let i = 0; i < pincode.length - 2; i++) {
    if (
      pincode[i] === pincode[i + 1] &&
      pincode[i] === pincode[i + 2]
    ) {
      return false;
    }
  }

  // ตรวจสอบเลขเรียงกันเกิน 2 ตัว จากหน้าไปหลัง
  for (let i = 0; i < pincode.length - 2; i++) {
    if (
      parseInt(pincode[i]) + 1 === parseInt(pincode[i + 1]) &&
      parseInt(pincode[i]) + 2 === parseInt(pincode[i + 2])
    ) {
      return false;
    }
  }

  // ตรวจสอบเลขเรียงกันเกิน 2 ตัว จากหลังไปหน้า
  for (let i = 0; i < pincode.length - 2; i++) {
    if (
      parseInt(pincode[i]) - 1 === parseInt(pincode[i + 1]) &&
      parseInt(pincode[i]) - 2 === parseInt(pincode[i + 2])
    ) {
      return false;
    }
  }

  // ตรวจสอบเลขชุดซ้ำเกิน 2 ชุด
  const digitCounts = {};
  for (let i = 0; i < pincode.length; i++) {
    const digit = pincode[i];
    if (digitCounts[digit]) {
      digitCounts[digit]++;
    } else {
      digitCounts[digit] = 1;
    }
  }

  let count = 0;
  for (const digit in digitCounts) {
    if (digitCounts[digit] > 1) {
      count++
    }
    if (count > 2) {
      return false
    }
  }

  return true;
}

function PincodeValidator() {
  const [pincode, setPincode] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handlePincodeChange = (e) => {
    const newPincode = e.target.value;
    setPincode(newPincode);
    setIsValid(validatePincode(newPincode));
  };

  return (
    <div className='center'>
      <input
        type="text"
        value={pincode}
        onChange={handlePincodeChange}
        placeholder="กรอก Pincode"
      />
      {isValid === null ? null : isValid ? (
        <p className="valid">Pincode ✅</p>
      ) : (
        <p className="invalid">Pincode ❌</p>
      )}
    </div>
  );
}

export default PincodeValidator;
