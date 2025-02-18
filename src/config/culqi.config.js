import Culqi from 'culqi-node';

const culqi = new Culqi({
  privateKey: process.env.PRIVATEKEY || 'sk_test_SWyklAB8rIyjXmje'
});

export default culqi;