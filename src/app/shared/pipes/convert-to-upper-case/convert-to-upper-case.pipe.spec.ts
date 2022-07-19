import { ConvertToUpperCasePipe } from './convert-to-upper-case.pipe';

describe('ConvertToUpperCasePipe', () => {
  let pipeUnderTest: ConvertToUpperCasePipe;

  beforeEach(() => {
    pipeUnderTest = new ConvertToUpperCasePipe();
  })

  it('should create an instance of the pipe', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  describe('#transform', () => {
    it('should return an empty string if the argument type is invalid', () => {
      const result = pipeUnderTest.transform(123);

      expect(result).toEqual('');
    });

    it('should return a converted string if the argument type is valid', () => {
      const value = 'This is test';
      const result = pipeUnderTest.transform(value);

      expect(result).toEqual(value.toUpperCase());
    })
  });
});
