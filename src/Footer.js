import React from 'react';
import coin from './assets/filecoin-logo.png';
import hack from './assets/browsers3000logo.png';
import './App.css';

const Footer = () => {
    return (
        <>

            <section className='award'>
                <div>
                    <h4>Winner Browsers 3000 - Filecoin Prize</h4>
                    <img src={hack} alt={"award"} />
                </div>
                <div>
                    <h4>Filecoin Next Steps Micro Grant - Awardee 2021</h4>
                    <img src={coin} alt={"award"} />
                </div>
            </section>
            <footer>
                <div>
                    <p>© 2022 Job Crypt</p>
                    <p>Framework by Uisual</p>
                    <p>Powered By Open Block EI</p>
                </div>
                <div className="footer-links" id='foot'>
                    <a href="#foot">About</a>
                    <span>|</span>
                    <a href="#foot">Terms</a>
                    <span>|</span>
                    <a href="#foot">Privacy Policy</a>
                    <span>|</span>
                    <a href="#foot">Cookie Policy</a>
                </div>
            </footer>
        </>
    );
}

export default Footer;