import React, { useState, useEffect } from 'react';
// import MetaMaskSDK from '@metamask/sdk';
import detectEthereumProvider from '@metamask/detect-provider'
import './App.css';

// const options = {
//     injectProvider: false,
//     communicationLayerPreference: 'webrtc',
//     checkInstallationOnAllCalls: true,
// };

// const MMSDK = new MetaMaskSDK(options);
// const ethereum = MMSDK.getProvider();
const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [hasProvider, setHasProvider] = useState(null)
    const initialState = { accounts: [] }               /* New */
    const [wallet, setWallet] = useState(initialState)  /* New */

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            setHasProvider(Boolean(provider))
        }

        getProvider()
    }, [])

    const updateWallet = async (accounts) => {     /* New */
        setWallet({ accounts })                          /* New */
    }                                                  /* New */

    const handleConnect = async () => {                /* New */
        let accounts = await window.ethereum.request({   /* New */
            method: "eth_requestAccounts",                 /* New */
        })                                               /* New */
        updateWallet(accounts)                           /* New */
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Email is required');
        } else if (!validateEmail(email)) {
            setErrorMessage('Invalid email address');
        } else {
            console.log('Form submitted');
        }
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    // const handleConnect = () => {
    //     ethereum.request({ method: 'eth_requestAccounts', params: [] });
    // }

    return (
        <section className='body'>
            <h3>Connect Web 3 to view the latest jobs!!</h3>
            <div className='hero'>
                <div className='youtube'>
                    <a href='https://www.youtube.com/channel/UCEX4iMGm6HXD9kP5MiEieAQ'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path>
                        </svg>
                    </a>
                    <p>How to use JobCrypt</p>
                </div>
                <div className='info'>
                    <a href='https://help.optimism.io/hc/en-us/articles/4411903123483-Connecting-your-wallet-to-Optimism'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                            <path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path>
                        </svg>
                    </a>
                     <button onClick={handleConnect}>Click to connect Metamask</button>
                </div>
                <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>
                <p>
                    Need Crypto? <span>TEST NET USE FAUCET!!</span>
                </p>
                {wallet.accounts.length > 0 &&                /* New */
                    <div>Wallet Accounts: {wallet.accounts[0]}</div>
                }
            </div>
            <section className='newsletter'>
                <h2>Ready to start?</h2>
                <p>Get the latest jobs direct to your inbox</p>
                <form onSubmit={handleSubmit}>
                    <p id='required'>
                        <span>*</span> indicates required
                    </p>
                    <label htmlFor='email'>
                        Email Address <span>*</span>
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter your email....'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderColor: errorMessage ? 'red' : '' }}
                    />
                    {errorMessage && !validateEmail(email) && <p id='error'>{errorMessage}</p>}
                    <button type='submit'>Join Alert List</button>
                </form>
            </section>
        </section>
    );
};

export default LandingPage;
