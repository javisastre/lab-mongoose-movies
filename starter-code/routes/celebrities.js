
const Celebrity = require("./../models/celebrity");

const express = require("express")
const router = express.Router();

// GET /celebrities/
router.get('/', (req, res, next)=> {
    Celebrity.find() 
    .then( allCelebrities => {
        console.log('Retrieved all celebrities', allCelebrities)
        const data = {
            celebs : allCelebrities
        }
        console.log(data, 'holhola')
    res.render("celebrities/index", data)
    }
    )
    .catch(error =>{
        console.log(error);
        next(error);
    })
})

router.get('/search/:id', (req, res, next) =>{
    Celebrity.findById(req.params.id)
    .then((foundCelebrity) => {
    res.render("celebrities/show", foundCelebrity)
    })
    .catch(error =>{
        console.log(error);
        next(error);
    })
})

router.get("/new", (req, res, next) => {
    res.render("celebrities/new")
})

router.post('/new', (req, res, next) =>{
const { name, occupation, catchPhrase} = req.body;
Celebrity.create({name, occupation, catchPhrase})
.then((createdCelebrity) => {
    res.redirect("/celebrities")
})
.catch(error => console.log(error))

})


module.exports= router;


