import Culqi from 'culqi-node';

const culqi = new Culqi({
    privateKey: process.env.PRIVATEKEY || config.PRIVATEKEY,
    publicKey: process.env.PUBLICKEY || config.PUBLICKEY,
    pciCompliant: true
});

export default culqi;