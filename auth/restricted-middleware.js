const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization; // create variable 'token' that references the authorization header given by the server which should include the CORRECT token

  if(token){
    const secret = process.env.JWT_ || 'secret'; // create variable 'secret' that references the secret/signature that is signed onto the token

    jwt.verify(token, secret, (err, decodedToken) => { // verify the validity of the token
      if(err){ // if the token has been tampered with (hackers), throw an error
        res.status(401).json({ message:'Invalid Credentials' })
      }else{
        req.decodeJwt = decodedToken;
        next();
      }
    })
  }else{
    res.status(400).json({ error:'Please provide credentials' });
  }
}