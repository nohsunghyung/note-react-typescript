import moment from 'moment';

// helper함수
const helper = {
  convertDateTime: (date: object): string => {
    let converTime: string = '';
    converTime = moment(date).format('YY.MM.DD HH:mm');
    return converTime;
  }
};

export default helper;
