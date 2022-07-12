const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    try {
        const usuarios = await User.find({}, 'firstname lastname email role');
        
        res.json({
            ok: true,
            usuarios,
            uid: req.uid
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }
}

const createUser = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({email});

        if(emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'This email address is already registered.'
            })
        }
        const user = new User(req.body);
        console.log(user)
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        // Save user
        await user.save();
        
        // Generate TOKEN - jwt
        const token = await generarJWT( user.id ); 
        
        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }
}

const updateUser = async ( req, res = response ) => {

    const uid = req.params.id

    try {

        const user = await User.findById(uid);

        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: "No user found with this id"
            })
        }

        // Updating
        const { email, password, ...campos } = req.body;

        if( user.email !== email ) {
            const emailExist = await User.findOne({email});
            if( emailExist ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'This email address is already being used.'
                })
            }
        }

        campos.email = email;

        const updatedUser = await User.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            user: updatedUser
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }


}

const deleteUser = async ( req, res = response ) => {

    const uid = req.params.id;

    try {
        const user = await User.findById(uid);

        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: "No user found with that id"
            })
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'User deleted.'
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }


}




module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}