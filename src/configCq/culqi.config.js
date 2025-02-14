import Culqi from 'culqi-node';

const culqi = new Culqi({
    privateKey: process.env.PRIVATEKEY || 'sk_test_SWyklAB8rIyjXmje',
    publicKey: process.env.PUBLICKEY || 'pk_test_89a1417406ce7fa2',
    pciCompliant: true
});

export default culqi;