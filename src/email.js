import React, { useState, useEffect } from 'react';

function EmailModal({ isOpen, onClose, onSave }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (isOpen && localStorage.getItem('email')) {
      setEmail(localStorage.getItem('email'));
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    localStorage.setItem('email', email);
    onSave(email);
    onClose();
  };

  if (!isOpen) {
    return null;
  }



  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Your Email</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
          className="email-input"
        />
        {emailError && <div className="email-error">{emailError}</div>}
        <div style={{ textAlign: 'right' }}>
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EmailModal;
