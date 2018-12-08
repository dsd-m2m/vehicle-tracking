import { MODULE_NAME } from '../../const';

import { getModuleState } from '../selectors';

describe('core/services/modules', () => {
  it('should compose valid canonical resource', () => {
    const moduleState = {
      modules: [],
      selectors: [],
    };

    const state = { [MODULE_NAME]: moduleState };

    expect(getModuleState(state, MODULE_NAME)).toEqual(moduleState);
  });
});
