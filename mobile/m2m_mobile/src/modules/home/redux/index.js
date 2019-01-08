export { default as reducer } from './reducer';

export {
  fetchCarState,
  fetchTripData,
  updateCarState,
  createSocket,
} from './actions';

export {
  getCarState,
  getSocket,
  getTripData,
} from './selectors';
