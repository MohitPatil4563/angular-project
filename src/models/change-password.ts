export class ChangePasswordModel{
 token: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';
}

export class ForgotPasswordModel{
  email:string='';
}

export class CreatePinModel{
   emailOrMobile: string = '';
   pin: string = '';
}
export class LoginPinModel{
  emailOrMobile: string = '';
  pin: string = '';
}