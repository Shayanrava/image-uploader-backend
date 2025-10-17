import Product from "../models/ProductModel.js";
import path from "path";
import fs from 'fs';
import { error } from "console";


const PUBLIC_DOMAIN = "image-uploader-backend-production-10f3.up.railway.app";

export const getProduct = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

export const singleProduct = async (req, res) => {

    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        res.json({ msg: error.message })
    }
}

export const saveProduct = (req, res) => {
    if (req.files == null) return res.json({ msg: "You did not select a photo." });

    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length
    const ext = path.extname(file.name);
    const dateNow = Math.round(Date.now());
    const fileName = dateNow + ext;
    // const fileName = file.md5 + ext;
    const url = `https://${PUBLIC_DOMAIN}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.json({ msg: "Extension is not allowed. only jpg and jepg and png images are allowed" });
    if (fileSize > 5000000) return res.json({ msg: "The image size is larger than 5 MB." });
    file.mv(`./public/images/${fileName}`, async (err) => {

        if (err) return res.json({ msg: err.message })
        try {
            await Product.create({ name: name, image: fileName, url: url });
            res.json({ msg: "The product was added successfully." });
        } catch (err) {
            res.json({ msg: err.message })
        }
    })

}

export const updateProduct = async (req, res) => {

    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.json({ msg: "The product was not found." });

    let fileName = ""
    let name = ""
    let url = ""
    if (req.body.title == "") {
        name = product.name
    } else {
        name = req.body.title;
    }

    if (req.files === null) {
        fileName = product.image
        url = `https://${PUBLIC_DOMAIN}/images/${fileName}`;
        try {
            await Product.update({ name: name, image: fileName, url: url }, {
                where: {
                    id: req.params.id
                }
            });
            res.json({ msg: "The product was update successfully." });
        } catch (err) {
            res.json({ msg: err.message })
        }

    } else {
        const file = req.files.file;
        const fileSize = file.data.length
        const ext = path.extname(file.name);
        const dateNow = Math.round(Date.now());
        fileName = dateNow + ext;
        // fileName = file.md5 + ext;
        url = `https://${PUBLIC_DOMAIN}/images/${fileName}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLowerCase())) return res.json({ msg: "Extension is not allowed. only jpg and jepg and png images are allowed" });
        if (fileSize > 5000000) return res.json({ msg: "The image size is larger than 5 MB." });
        fs.unlinkSync(`./public/images/${product.image}`);
        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.json({ msg: err.message })
        });
    }
    try {
        await Product.update({ name: name, image: fileName, url: url }, {
            where: {
                id: req.params.id
            }
        });
        res.json({ msg: "The product was update successfully." });
    } catch (err) {
        res.json({ msg: err.message })
    }
}

export const deleteProduct = async (req, res) => {

    const response = await Product.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!response) return res.json({ msg: "The product was not found." });

    try {

        const filePath = `./public/images/${response.image}`;
        fs.unlinkSync(filePath);

        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ msg: "The product was delete successfully ." });

    } catch (error) {
        res.json({ msgd: error.message });;
    }



}