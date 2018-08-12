import { handleActions } from 'redux-actions';
import utils from 'utils/general';

const initialState = {
  fetchDevices: {
    requesting: false,
    devices: null,
    error: null,
    total: null,
    totalPages: null,
  },
  fetchDevice: {
    requesting: false,
    device: null,
    error: null,
  },
  createDevice: {
    requesting: false,
    device: null,
    error: null,
  },
  updateDevice: {
    requesting: false,
    device: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_DEVICES: (state, action) => ({
    ...state,
    fetchDevices: {
      ...state.fetchDevices,
      requesting: true,
      total: null,
      totalPages: null,
    },
  }),
  RECEIVE_DEVICES: {
    next(state, action) {
      return {
        ...state,
        fetchDevices: {
          ...state.fetchDevices,
          requesting: false,
          devices: action.payload.data,
          error: null,
          total: action.payload.total,
          totalPages: utils.calculatePages(action.payload.total, action.payload.limit),
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchDevices: {
          ...state.fetchDevices,
          requesting: false,
          devices: null,
          error: action.payload,
          total: null,
          totalPages: null,
        },
      };
    }
  },
  REQUEST_DEVICE: (state, action) => ({
    ...state,
    fetchDevice: {
      ...state.fetchDevice,
      requesting: true,
      device: null,
      error: null,
    },
  }),
  RECEIVE_DEVICE: {
    next(state, action) {
      return {
        ...state,
        fetchDevice: {
          ...state.fetchDevice,
          requesting: false,
          device: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchDevice: {
          ...state.fetchDevice,
          requesting: false,
          device: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_CREATE_DEVICE: (state, action) => ({
    ...state,
    createDevice: {
      ...state.createDevice,
      requesting: false,
      device: null,
      error: null,
    },
  }),
  REQUEST_CREATE_DEVICE: (state, action) => ({
    ...state,
    createDevice: {
      ...state.createDevice,
      requesting: true,
      device: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_DEVICE: {
    next(state, action) {
      return {
        ...state,
        createDevice: {
          ...state.createDevice,
          requesting: false,
          device: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createDevice: {
          ...state.createDevice,
          requesting: false,
          device: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_UPDATE_DEVICE: (state, action) => ({
    ...state,
    updateDevice: {
      ...state.updateDevice,
      requesting: true,
      device: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_DEVICE: {
    next(state, action) {
      return {
        ...state,
        updateDevice: {
          ...state.updateDevice,
          requesting: false,
          device: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateDevice: {
          ...state.updateDevice,
          requesting: false,
          device: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_UPDATE_DEVICE: (state, action) => ({
    ...state,
    updateDevice: {
      ...state.updateDevice,
      requesting: false,
      device: null,
      error: null,
    },
  }),
}, initialState);
