import * as jwt from 'jsonwebtoken';

interface IVerifyError {
  error: jwt.VerifyErrors | null;
}

export default IVerifyError;
