import React from 'react';
import { ModalDialog } from '../ModalDialog';

export default function NetworkErrorModal(props) {
  return (
    <ModalDialog
      title="Network Error"
      error="Please check your internet connection and try again"
      buttonTitle="TRY AGAIN"
      {...props}
    />
  );
}

NetworkErrorModal.propTypes = { ...ModalDialog.propTypes };
