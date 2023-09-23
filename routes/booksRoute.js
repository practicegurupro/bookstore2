import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();

router.post('/', async(request,response) => {
    try{
    if(
    !request.body.title ||
    !request.body.author ||
    !request.body.publishYear
    
    
    ){
    return response.status(400).send({
    
        message: 'Send all details',
    })
    
    }
    const newBook = {
    
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    }
    
    const book = await Book.create(newBook);
    return response.status(201).send(book);
    
    } catch(error){
    
        console.log(error.message);
        response.status(500).send({message1:error.message});
    }
    
    });
    
    
    router.get('/', async (request, response) => {
    
    try{
    
        const books = await Book.find({});
    
        return response.status(200).json({
            
            
            data:books
        }
        );
    }catch {
    
    }
    })
    
    
    
    router.get('/:id', async (request, response) => {
        try {
            const { id } = request.params;
            const book = await Book.findById(id);
            
            if (book) {
                return response.status(200).json(book);
            } else {
                return response.status(404).send({ message: 'Book not found' });
            }
        } catch (error) {
            console.log(error.message);
            response.status(500).send({ message3: error.message });
        }
    });
    
    
    router.put('/:id', async (request, response) => {
    
    try{
    
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
            
            
            ){
            return response.status(400).send({
            
                message: 'Send all details',
            })
            
            }
    
            const { id } = request.params;
    
            const result = await Book.findByIdAndUpdate(id, request.body);
    
            if (!result){
                return response.status(404).send({ message: 'Book not found' });
    
            }
    
            return response.status(200).send({ message6: 'Book updated successfully'});
    
    }catch(error){
    
        console.log(error.message);
        response.status(500).send({ message4: error.message });
    
    }
    
    
    })
    
    
    router.delete('/:id', async(request,response) => {
    
        try{
            const { id } = request.params;
    
            const result = await Book.findByIdAndDelete(id);
    
            if (!result){
                return response.status(404).send({ message: 'Book not found' });
    
            }
    
            return response.status(200).send({ message6: 'Book deleted successfully'});
    
        }catch(error){
            console.log(error.message);
            response.status(500).send({ message4: error.message });
    
    
        }
    
    
    })


   export default router;