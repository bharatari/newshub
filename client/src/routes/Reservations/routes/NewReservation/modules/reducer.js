import { handleActions } from 'redux-actions';

const initialState = {
  modal: {
    show: false,
  },
  fetchReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  fetchDeviceByBarcode: {
    requesting: false,
    device: null,
    error: null,
  },
  form: {
    selectedDevices: [],
  },
};

export default handleActions({
  'routes/NewReservation/SHOW_MODAL': (state, action) => ({
    ...state,
    modal: {
      ...state.modal,
      show: true,
    },
  }),
  'routes/NewReservation/HIDE_MODAL': (state) => ({
    ...state,
    modal: {
      ...state.modal,
      show: false,
    },
  }),
  'routes/NewReservation/REQUEST_RESERVATION': (state) => ({
    ...state,
    fetchReservation: {
      ...state.fetchReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  'routes/NewReservation/RECEIVE_RESERVATION': {
    next(state, action) {
      return {
        ...state,
        fetchReservation: {
          ...state.fetchReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchReservation: {
          ...state.fetchReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
  'routes/NewReservation/RESET_FETCH_RESERVATION': (state, action) => ({
    ...state,
    fetchReservation: {
      ...state.fetchReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  'routes/NewReservation/REQUEST_DEVICE': (state) => ({
    ...state,
    fetchDeviceByBarcode: {
      ...state.fetchDeviceByBarcode,
      requesting: true,
      device: null,
      error: null,
    },
  }),
  'routes/NewReservation/RECEIVE_DEVICE': {
    next(state, action) {
      return {
        ...state,
        fetchDeviceByBarcode: {
          ...state.fetchDeviceByBarcode,
          requesting: false,
          device: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchDeviceByBarcode: {
          ...state.fetchDeviceByBarcode,
          requesting: false,
          device: null,
          error: action.payload,
        },
      };
    }
  },
  'routes/NewReservation/RESET_FETCH_DEVICE': (state, action) => ({
    ...state,
    fetchDeviceByBarcode: {
      ...state.fetchDeviceByBarcode,
      requesting: true,
      device: null,
      error: null,
    },
  }),
  'routes/NewReservation/SET_WIZARD_VALUE': (state, action) => ({
    ...state,
    form: {
      ...state.form,
      [action.payload.key]: action.payload.value
    },
  })
}, initialState);
