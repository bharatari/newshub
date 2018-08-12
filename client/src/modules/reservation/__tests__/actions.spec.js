import * as actions from '../actions';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import dataUtils from 'utils/data';
import nock from 'nock';
import { initialState } from '../reducer';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('(Actions) Reservation', () => {
  it('should create an action to request reservations', () => {
    const expected = {
      type: 'REQUEST_RESERVATIONS',
    };

    expect(actions.requestReservations()).to.deep.equal(expected);
  });

  it('should create an action to receive reservation', () => {
    const data = [
      { id: 1 },
    ];
    const expected = {
      type: 'RECEIVE_RESERVATIONS',
      payload: data,
    };

    expect(actions.receiveReservations(data)).to.deep.equal(expected);
  });

  it('should create an action to request reservation', () => {
    const expected = {
      type: 'REQUEST_RESERVATION',
    };

    expect(actions.requestReservation()).to.deep.equal(expected);
  });

  describe('#fetchReservation', () => {
    /*
    it('should return data', () => {
      const data = {
        total: 10,
        data: {
          id: 1,
        }
      };

      nock(dataUtils.base())
        .get('/api/reservation/1')
        .reply(200, {
          body: {
            data,
          },
        });
      
      const expectedActions = [
        { type: 'REQUEST_RESERVATION' },
        { type: 'RECEIVE_RESERVATION', payload: data.data }
      ];

      const store = mockStore({
        reservation: initialState,
      });


      return store.dispatch(actions.fetchReservation(1))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });*/
  });
});
