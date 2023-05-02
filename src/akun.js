import Akun from 'akun-api'

const akun = new Akun({
  protocol: 'http:',
  hostname: 'localhost:5050',
  connection: {
    hostname: 'rt.fiction.live'
  }
})
window.akun = akun // make debugging easier

export default akun
