import { MODULE_NAME } from '../../const';

import { canonicalResource } from '../modules';

describe('core/services/modules', () => {
  it('should compose valid canonical resource', () => {
    const resource = 'module-resource-name';

    expect(canonicalResource(MODULE_NAME, resource)).toBe(`${MODULE_NAME}/${resource}`);
  });
});
