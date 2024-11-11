export class RegexpConstant {
    public static readonly loginId = /^[a-z0-9]+$/;
    public static readonly password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
}
