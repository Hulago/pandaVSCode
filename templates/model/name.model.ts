import { BaseModel, endpoint, prop } from '@prz/services';

@endpoint('${_.kebabCase(name)}')
export class ${_.pascalCase(name)}Model extends BaseModel {
  @prop()
  id: number;

  constructor(data?: Partial<${_.pascalCase(name)}Model>) {
    super(data);
  }
}
