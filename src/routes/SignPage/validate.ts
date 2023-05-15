import useDict from '../../hooks/useDict';

const ValidationPassword = () => {
  const getDictVal = useDict();
  return {
    required: {
      value: true,
      message: getDictVal('enterPassword'),
    },
    minLength: {
      value: 8,
      message: getDictVal('minLengthPassword'),
    },
    maxLength: {
      value: 15,
      message: getDictVal('maxLengthPassword'),
    },
    validate: {
      hasNumber: (value: string) => /[0-9]+/gm.test(value) || getDictVal('minOneNumberPassword'),
      hasLetter: (value: string) => /[A-Z]+/gim.test(value) || getDictVal('minOneLetterPassword'),
      hasSpecialChar: (value: string) =>
        /[-#!$@%^&*_+~=:;?/]+/gm.test(value) || getDictVal('minOneSpecialCharPassword'),
    },
  };
};

export default ValidationPassword;
