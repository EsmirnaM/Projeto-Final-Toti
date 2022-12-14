const router = require('express').Router()

const { application } = require('express')
const Prato = require('../models/Prato')





//-----------------------------------------------Post-------------------------------------------

router.post('/prato', async (req,res) => {
    // req.body

    const {codigo, nome, descrição, preço, vegetariano} = req.body
    

    const prato = {
        codigo,nome, descrição, preço, vegetariano, 
    }

    try {

    //-----------------------------------------validações-----------------------------------------


    //-----------------------validação caso esteja faltando inserir um dado-----------------------    

        if(!nome && !descrição && !preço && !vegetariano){
        res.status(400).json({error:'É necessario informar nome, descrição, preço e se o prato é ou não vegetariano'})
        return 
        }

        if(!nome && !descrição && !preço){
            res.status(400).json({error:'É necessario informar nome, descrição e o preço do prato'})
            return 
            }
    
        if(!nome && !descrição && !vegetariano){
            res.status(400).json({error:'É necessario informar nome, descrição e se o prato é ou não vegetariano'})
            return 
            }

        if(!nome && !preço && !vegetariano){
            res.status(400).json({error:'É necessario informar nome, preço e se o prato é ou não vegetariano'})
            return 
            }

        if(!descrição && !preço && !vegetariano){
            res.status(400).json({error:'É necessario informar preço, descrição, preço e se o prato é ou não vegetariano'})
            return 
            }

        if(!nome && !descrição ) {
            res.status(400).json({error:'É necessario informar o nome e a descrição do prato'})
            return
            }

        if(!nome && !preço ) {
            res.status(400).json({error:'É necessario informar o nome e o preço do prato'})
            return
            }

        if(!nome && !vegetariano ) {
            res.status(400).json({error:'É necessario informar o nome e se o prato é vegetariano'})
            return
            }

        if(!descrição && !vegetariano ) {
            res.status(400).json({error:'É necessario informar a descrição e se o prato é vegetariano'})
            return
            }
        

        if(!nome) {
            res.status(400).json({error:'É necessario informar o nome do prato'})
            return
        }

        
    
        if(!descrição) {
            res.status(400).json({error:'É necessario informar a descrição do prato'})
            return
        }
    
        if(!preço) {
            res.status(400).json({error:'É necessario informar o preço do prato'})
            return
        }

        
    
        if(vegetariano == undefined) {
            res.status(500).json({error:'É necessario informar se o prato é vegetariano ou não'})
            return
        }


    //----------------validação caso o dado informado já existe na base de dados---------------------

        //codigo
        const codigoExiste = await Prato.findOne ({codigo: codigo})

        if (codigoExiste){
            res.status(400).json({
                message: 'o codigo informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

  
     
        await Prato.create(prato)
    
        res.status(200).json({message:'Prato cadastrado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }



    
    })


    


    //-------------------------------------------Get---------------------------------------------
   router.get('/pratos', async (req, res) => {
    try {

        const prato = await Prato.find()

        res.status(200).json(prato)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //------------------------------------get por id----------------------------------------

   router.get('/prato/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const prato = await Prato.findOne({ _id: id })
    
    
    if(!prato) {
        res.status(404).json({ message: 'O prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(prato)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})


//-------------------------------------------------get pelo código-------------------------------------------------------------

router.get('/prato/codigo/:codigo', async (req, res) => {
    
    const {codigo} = req.params
    
    try {
     const prato = await Prato.findOne({codigo})
     
     
        if(!prato) {
            res.status(404).json({ message: 'O prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(prato)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })
 

 

//-------------------------------------atualização de dados pelo id----------------------------------------------



router.put('/prato/:id', async(req, res) => {
    
    const id = req.params.id

    const { nome, descrição, preço, vegetariano } = req.body

    const prato = {nome, descrição, preço, vegetariano}

    try {
        const updatedPrato = await Prato.updateOne({ _id: id }, prato)
        
        if(updatedPrato.matchedCount === 0) {
         res.status(404).json({ message: "O prato informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Prato atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})

//---------------------------------atualização de dados chamando pelo codigo---------------------------------------------------

router.put('/prato/codigo/:codigo', async(req, res) => {
    
    const {codigo} = req.params

    const { nome, descrição, preço, vegetariano} = req.body

    const prato = {nome, descrição, preço, vegetariano}

    try {
        const updatedPrato = await Prato.updateOne({ codigo }, prato)
        
        if(updatedPrato.matchedCount === 0) {
         res.status(404).json({ message: "Prato informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Prato atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//---------------------------------------------Delete-------------------------------------------


router.delete('/prato/:id', async (req, res) => {

    const id = req.params.id

    const prato = await Prato.findOne({ _id: id })
    
    if(!prato  ) {
        res.status(404).json({ message: 'O prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }



    try {

        await Prato.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Prato excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//------------------------------------------Delete pelo codigo-------------------------------------------------------------------


router.delete('/prato/codigo/:codigo', async (req, res) => {

    const {codigo} = req.params

    const prato = await Prato.findOne({ codigo })
    
    if(!prato) {
        res.status(404).json({ message: 'Prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Prato.deleteOne({ codigo })

        res.status(200).json ({ message: 'Prato excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})





    module.exports = router
    