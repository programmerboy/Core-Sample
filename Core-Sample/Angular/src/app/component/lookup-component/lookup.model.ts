import { NetworkModel } from 'src/app/shared/models/common-model';

export class LookupModel {

  constructor(public country = '',
    public carrierName = '',
    public brand = '',
    public phoneModel = '',
    public subModel = ''
  ) { }
}

export class LookupModelError {
  constructor(public country = '',
    public carrierName = '',
    public brand = '',
    public phoneModel = '',
    public subModel = ''
  ) { }
}

export class Compatablity extends NetworkModel {

  public twoGMatchedFreq: number;
  public threeGMatchedFreq: number;
  public fourGMatchedFreq: number;
  public fiveGMatchedFreq: number;

  public twoGFullCompatible: boolean;
  public threeGFullCompatible: boolean;
  public fourGFullCompatible: number;
  public fiveGFullCompatible: number;

  public carrierFrequencies: NetworkModel;
  public deviceFrequencies: NetworkModel;

}
