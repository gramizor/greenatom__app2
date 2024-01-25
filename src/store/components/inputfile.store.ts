import { makeAutoObservable, runInAction } from "mobx";
import { objFromMobx } from "../../helpers/main.helper";

class InputFile {
  constructor() {
    makeAutoObservable(this);
  }

  data: { [key: string]: any } = {};

  rm(fieldName: string) {
    runInAction(() => {
      this.data[fieldName] = undefined;
    });
  }


  set(fieldName: string, value: any) {
    runInAction(() => {
      this.data[fieldName] = value;
    })
  }

  get(fieldName: string) {
    return this.data[fieldName];
  }
}

export const inputfilestore = new InputFile();
