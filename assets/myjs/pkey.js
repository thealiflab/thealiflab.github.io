
// P key Pop up before webpage load
window.onload = function() {
    var password = prompt('Please enter the password to access the blog:', '');
    if (password !== 'SimpleyTurnOffTheJSNoobie') { 
        window.location.href = 'HOME_PAGE_URL';
        alert('Incorrect password. You will be redirected.');
    }
};
