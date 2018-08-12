import reducer, { initialState } from '../reducer';
import { expect } from 'chai';

describe('(Reducer) Reservation', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle REQUEST_RESERVATION', () => {
    const expectedState = {
      ...initialState,
      fetchReservation: {
        ...initialState.fetchReservation,
        requesting: true,
        reservation: null,
        error: null,
      }
    };

    expect(reducer(undefined, { type: 'REQUEST_RESERVATION' })).to.deep.equal(expectedState);
  });
});
