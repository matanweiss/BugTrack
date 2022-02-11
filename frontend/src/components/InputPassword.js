const InputPassword = (props) => {
    return (
        <div className='relative'>
            <input required minLength='6' value={props.password} type="password" onChange={e => props.setPassword(e.target.value)} placeholder='Password' className="peer placeholder-input" />
            <label className='placeholder-label'>Password</label>
        </div>
    );
}

export default InputPassword;