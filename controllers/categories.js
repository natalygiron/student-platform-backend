const { response } = require('express');

const Category = require("../models/category");

const getCategories = async (req, res) => {

    try {
        const category = await Category.find();
        
        res.json({
            ok: true,
            category
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.' + error  
        });
    }

}

const getCategoryById = async ( req, res = response ) => {
    
    const id = req.params.id;

    try {
        
        const category = await Category.findById(id);
        
        if(!category) {
            return res.status(404).json({
                ok:true,
                msg: 'No category found with that id.'
            })
        }

        res.json({
            ok: true,
            category
        });

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'An error has ocurred.' + error  
        }) 
    }
}


const createCategory = async ( req, res = response) => {

    const uid = req.uid;
    
    try {
        const category = new Category({
            user: uid,
            ...req.body
        })
        
        const newCategory = await category.save();

        res.json({
            ok: true,
            category: newCategory
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.' + error  
        });
    }
}

const updateCategory = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                ok:true,
                msg: 'No category was found with that id.'
            })
        }

        const categoryChanges = {
            ...req.body,
            usuario: uid,
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, categoryChanges, {new: true})
        
        res.json({
            ok:true,
            category: updatedCategory
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }

}

const deleteCategory = async ( req, res = response ) => {
    const id = req.params.id;

    try {

        const category = await Category.findById(id);

        if(!category){
            return res.status(404).json({
                ok: true,
                msg: 'No category was found with that id.'
            })
        }

        await Category.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Deleted'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.' + error
        });
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}



