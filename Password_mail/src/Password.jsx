import {useCallback, useEffect, useRef, useState} from "react";

function Password() {
    const [password, setPassword] = useState('')
    const [length, setLength] = useState('8')
    const [isNumber, setIsNumber] = useState(false)
    const [isCharacter, setIsCharacter] = useState(false)
    const [isPassword, setIsPassword] = useState('')
    const [copySuccess, setCopySuccess] = useState('Copy');

    //useref hook
    const passwordRef = useRef(null);

    //using usecallback for the  better optimization
    const passwordGenerator = useCallback(() =>{
        let password = "";
        let custom = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(isCharacter) custom += "!@#$%^&*-_+=[]{}~`"
        if(isNumber) custom += "0123456789"

        for ( let i = 1; i <= length; i++ ) {
            let char = Math.floor(Math.random() * custom.length + 1)
            password += custom.charAt(char)
        }
        setPassword(password)
        setCopySuccess('Copy');
    }, [isCharacter, length, isNumber, setIsPassword])

    useEffect(()=>{
        passwordGenerator()
    }, [passwordGenerator, isCharacter, length, isNumber])

    const copyToClipboard = useCallback(() => {
        passwordRef.current?.select();
        document.execCommand('copy');
        setCopySuccess('Copied!');
    }, [isPassword])

    return(
        <>
            <div className="password">
                <div
                    className="w-full max-w-md mx-auto shadow-md rounded-lg px-24 py-13 my-8 bg-gray-800 text-orange-500">
                    <h1 className="text-base/7 font-semibold dark:text-white lg:text-center p-5">
                        Password Generator
                    </h1>
                    <div className="flex shadow rounded-lg overflow-hidden mb-4">
                        <input
                            type="text"
                            value={password}
                            className="bg-white outline-none w-full py-1 px-3"
                            placeholder="Password"
                            ref={passwordRef}
                            readOnly
                        />
                        <button
                            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
                            onClick={copyToClipboard}>{copySuccess}</button>

                    </div>
                    <h1 className="text-base/7 font-semibold dark:text-white p-5">Customization option</h1>
                    <div className='flex flex-col text-sm gap-x-2'>
                        <div className='flex items-center mb-4'>
                            <input id="steps-range" type="range" min="6" max="50" value={length}
                                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    onChange={(e) => setLength(e.target.value)}/>
                            <label className="flex-none ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Length: {length}</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" defaultChecked={isNumber}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={()=>{setIsNumber((prev) => !prev) }}/>
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" defaultChecked={isCharacter}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                   onChange={()=>{setIsCharacter((prev) => !prev) }}/>
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Character</label>
                        </div>
                    </div>
                </div>
            </div>
        </>

);
}

export default Password