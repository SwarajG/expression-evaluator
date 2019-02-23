import input1 from './input1.json';
import input2 from './input2.json';
import input3 from './input3.json';

function getInput(id) {
  const promise = new Promise((resolve, reject) => {
    switch (id) {
      case 'input1':
        return resolve(input1);
      case 'input2':
        return resolve(input2);
      case 'input3':
        return resolve(input3);
      default:
        return reject();
    }
  });
  return promise;
}


export { getInput };