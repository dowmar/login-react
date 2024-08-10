import FacebookLogin from 'react-facebook-login';

const Facebook = () => {
    const handleFacebookCallback = (response) => {
        if (response?.status === "unknown") {
            console.error('Sorry!', 'Something went wrong with facebook Login.');
            return;
        }
        console.log(response);
    }

    return (
        <FacebookLogin
            buttonStyle={{ padding: "6px" }}
            appId="3780468242231803"  // we need to get this from facebook developer console by setting the app.
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookCallback} />
    );
};
export default Facebook;