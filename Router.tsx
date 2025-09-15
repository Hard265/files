export type RootStackParamsList = {
    SignIn: undefined;
    SignUp: undefined;
    VerifyEmail: {
        email: string;
    };
    ForgotPassword: undefined;
    Home: undefined;
    Folder: {
        id: string;
    };
    ManageAccess: {
        ref: __ref;
        tab?: "people" | "links";
    };
    Share: {
        refs: __ref[];
    };
    Settings: undefined;
};

