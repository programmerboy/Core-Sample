import { NetworkModel } from 'src/app/shared/models/common-model';

export class DeviceModel extends NetworkModel {
  constructor(
    public brand: string = '',
    public phoneModel: string = '',
    public subModel: string = '',
    public date_Added?: Date,
    public date_Modified?: Date) {
    super();
  }
}

export class DeviceModelError extends NetworkModel {
  constructor(
    public brand: string = '',
    public phoneModel: string = '',
    public subModel: string = '') {
    super();
  }
}
