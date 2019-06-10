
const providers = ['twitter', 'google', 'facebook'];

const callbacks = providers.map(provider => {
    return process.env.NODE_ENV === 'production'
    ? `https://react-auth-twitter.herokuapp.com/${provider}/callback`
    : `${process.env.CLIENT_URL}/${provider}/callback`
});

const [twitterURL, googleURL, facebookURL] = callbacks;

module.exports = {
    CLIENT_ORIGIN: process.env.NODE_ENV === 'production'
        ? 'twitter.com/..'
        :  process.env.URL,

    TWITTER_CONFIG: {
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: twitterURL,
    },

    // GOOGLE_CONFIG = {
    //     clientID: process.env.GOOGLE_KEY,
    //     clientSecret: process.env.GOOGLE_SECRET,
    //     callbackURL: googleURL
    // },

    // FACEBOOK_CONFIG = {
    //     clientID: process.env.FACEBOOK_KEY,
    //     clientSecret: process.env.FACEBOOK_SECRET,
    //     profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
    //     callbackURL: facebookURL
    // }
}
