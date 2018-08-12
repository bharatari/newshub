export default {
  errors: {
    'EMAIL_TAKEN': { 
      header: 'That email is taken.',
      text: 'Try a different one to continue',
    },
    'ERROR': {
      header: 'Something went wrong. Try again.',
    },
    'SIGNUP_TOKEN_EXPIRED': {
      header: 'That signup token is expired',
      text: 'You will need to request a new one from management',
    },
    'SIGNUP_TOKEN_INVALID': {
      header: 'Your signup token is invalid',
      text: 'You will need to request a new one from management',
    },
    'SIGNUP_TOKEN_USED': {
      header: 'This signup token has already been used',
      text: 'You will need to request a new one from management',
    },
    'USER_DISABLED': {
      header: 'Your account has been disabled',
      text: 'Please contact management if you believe this has happened in error',
    },
    'MASTER_SPECIAL_REQUEST': {
      header: 'This reservation has a special request',
      text: 'It will need to be approved by a master user',
    },
    'INVALID_RESET_PASSWORD_TOKEN': {
      header: 'This link has either expired or is invalid',
      text: 'Please try requesting another link'
    },
    'EMAIL_MISMATCH_RESET_PASSWORD_TOKEN': {
      header: 'This link does not match the email provided',
      text: 'Make sure you provided the correct email address'
    },
    'USED_RESET_PASSWORD_TOKEN': {
      header: 'This link has already been used',
      text: 'Please request another link'
    },
    'EXPIRED_RESET_PASSWORD_TOKEN': {
      header: 'This link has expired',
      text: 'Please request another link'
    },
    'USER_NOT_FOUND_RESET_PASSWORD_TOKEN': {
      header: 'We are unable to find an account associated with this email address',
      text: 'Please ensure you have provided the correct email address'
    },
    'ROOM_UNAVAILABLE': {
      header: 'The room you selected is not available for the given times',
      text: 'Try a different range of dates. If you need this time slot, speak to management about deleting the previous reservation.'
    },
    'EVENT_CLOSED': {
      header: 'This event is closed.',
      text: 'You cannot check in for an event that is marked as closed. If you think this is an error, speak to management.'
    },
    'EVENT_NOT_STARTED': {
      header: 'This event has not started yet.',
      text: 'You cannot check in for an event before its start date. If you think this is an error, speak to management.'
    },
    'BARCODE_NOT_FOUND': {
      header: 'We cannot seem to find that user',
      text: 'Please try again later or contact a member of management for assistance.'
    },
  },
  getError(code) {
    return this.errors[code] || this.errors['ERROR'];
  }
}
