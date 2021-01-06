exports.userId = () => {
    console.log('from userID');
    return window.localStorage.getItem('userAuthId');
}