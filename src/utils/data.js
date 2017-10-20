export function getArrayFromObject(obj) {
  const list = [];
  if(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      list.push({...value, id: key});
    }); 
  }
  return list;
}

export function getFirstEntry(obj) {
  return getArrayFromObject(obj)[0];
}
