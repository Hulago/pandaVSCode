import { BaseModel, endpoint, prop } from '@prz/services';

@endpoint('${_.snakeCase(name)}')
export class ${_.PascalCase(name)}Model extends BaseModel {
  @prop()
  id: number;

  constructor(data?: Partial<${_.PascalCase(name)}Model>) {
    super(data);
  }
}
