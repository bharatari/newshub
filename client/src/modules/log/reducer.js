import { handleActions } from 'redux-actions';
import utils from 'utils/general';

const initialState = {
  fetchLog: {
    requesting: false,
    log: null,
    error: null,
  },
  fetchLogs: {
    requesting: false,
    logs: null,
    error: null,
    total: null,
    totalPages: null,
  },
  createLog: {
    requesting: false,
    log: null,
    error: null,
  },
  updateLog: {
    requesting: false,
    log: null,
    error: null,
  },
};

export default handleActions({
  RESET_FETCH_LOGS: (state, action) => ({
    ...state,
    fetchLogs: {
      ...state.fetchLogs,
      requesting: false,
      logs: null,
      error: null,
      total: null,
    },
  }),
  REQUEST_LOGS: (state, action) => ({
    ...state,
    fetchLogs: {
      ...state.fetchLogs,
      requesting: true,
      logs: null,
      error: null,
      total: null,
    },
  }),
  RECEIVE_LOGS: {
    next(state, action) {
      return {
        ...state,
        fetchLogs: {
          ...state.fetchLogs,
          requesting: false,
          logs: action.payload.data,
          error: null,
          total: action.payload.total,
          totalPages: utils.calculatePages(action.payload.total, action.payload.limit),
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchLogs: {
          ...state.fetchLogs,
          requesting: false,
          logs: null,
          error: action.payload,
          total: null,
          currentPage: null,
          totalPages: null,
        },
      };
    }
  },
  REQUEST_LOG: (state, action) => ({
    ...state,
    fetchLog: {
      ...state.fetchLog,
      requesting: true,
      log: null,
      error: null,
    },
  }),
  RECEIVE_LOG: {
    next(state, action) {
      return {
        ...state,
        fetchLog: {
          ...state.fetchLog,
          requesting: false,
          log: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchLog: {
          ...state.fetchLog,
          requesting: false,
          log: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_CREATE_LOG: (state, action) => ({
    ...state,
    createLog: {
      ...state.createLog,
      requesting: false,
      log: null,
      error: null,
    },
  }),
  REQUEST_CREATE_LOG: (state, action) => ({
    ...state,
    createLog: {
      ...state.createLog,
      requesting: true,
      log: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_LOG: {
    next(state, action) {
      return {
        ...state,
        createLog: {
          ...state.createLog,
          requesting: false,
          log: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createLog: {
          ...state.createLog,
          requesting: false,
          log: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_UPDATE_LOG: (state, action) => ({
    ...state,
    updateLog: {
      ...state.updateLog,
      requesting: false,
      log: null,
      error: null,
    },
  }),
  REQUEST_UPDATE_LOG: (state, action) => ({
    ...state,
    updateLog: {
      ...state.updateLog,
      requesting: true,
      log: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_LOG: {
    next(state, action) {
      return {
        ...state,
        updateLog: {
          ...state.updateLog,
          requesting: false,
          log: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateLog: {
          ...state.updateLog,
          requesting: false,
          log: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
