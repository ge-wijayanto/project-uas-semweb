var express = require('express');
var router = express.Router();
var d3 = require('d3-sparql');

/* GET Data */
router.get('/', async(req, res) => {
    try {
        var myQuery = `
            prefix : <http://www.car-database.org/lenovo/2022/4/project-semweb#> 
            prefix owl: <http://www.w3.org/2002/07/owl#> 
            prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
            prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
            
            SELECT ?model ?year ?engine WHERE { 
                ?id a :Vehicle . 
                ?id :model ?model . 
                ?id :year ?year . 
                ?id :engine ?engine . 
            }`;
        
        var sparqlEndpoint = 'http://localhost:3030/cardata/sparql';

        d3.sparql(sparqlEndpoint, myQuery).then((results) => {
            console.log(results); 
            res.render('car_listings', { title: 'Data', cars: results });
        });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.error('Error', err.message);
        }
    }
});

module.exports = router;