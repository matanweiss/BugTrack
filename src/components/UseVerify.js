
const UseVerify = (history, page) => {

    fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/verify', {
        method: 'post',
        body: JSON.stringify({ user: localStorage.getItem('jwt') }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            if (!res.ok) history.push('/login');
            else if (page === 'login') history.push('/dashboard');
        });
}

export default UseVerify;