
import { dolls } from 'girlsfrontline-core';

const getDollSpine = (dollId) => {
  const doll = dolls.find(item => item.id === dollId);
  const lowerDollName = String(doll.codename).toLowerCase();
  const dollSpine = {
    code: lowerDollName,
    names: { },
  };
  dollSpine.names[lowerDollName] = ['png', 'atlas', 'skel'];
  if (doll.skins && doll.id < 20000) {
    doll.skins.forEach((item) => {
      dollSpine.names[`${lowerDollName}_${item.id}`] = ['png', 'atlas', 'skel'];
    });
  }

  return dollSpine;
};

export default getDollSpine;