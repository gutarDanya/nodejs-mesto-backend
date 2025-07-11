export class IncorrectEnterData extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default IncorrectEnterData;
