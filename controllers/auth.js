const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({email});
        if( !user ){
            return res.status(404).json({
                ok: false,
                msg: "Unknown email."
            })
        }
        
        // Verify password
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password.'
            });
        }

        // Generate TOKEN - jwt
        const token = await generarJWT( user.id); 

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'
        })
    }


}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generate Token jwt
    const token = await generarJWT(uid);

    // Get user by UID
    const usuario = await User.findById(uid);

    res.json({
        ok:true,
        token,
        usuario
    })

}


module.exports = {
    login,
    renewToken
}