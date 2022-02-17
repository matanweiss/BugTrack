const InputEmail = (props) => {
    return (
        <div className='relative'>
            <input ref={props.toRef} required type="email" value={props.email} onChange={e => props.setEmail(e.target.value)} placeholder='Email address' className="peer placeholder-input" />
            <label className='placeholder-label'>Email address</label>
        </div>
    );
}

export default InputEmail;