const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); 
// Not sure if I need this 
/**
 * Get all of the items on the shelf
 */

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  const sqlQuery =`
  SELECT * FROM "item";
  `
  pool.query(sqlQuery)

  .then((results) => res.send(results.rows))
  .catch((error => {
    console.log('Error making GET for item:', error);
    res.sendStatus(500);
  }))
});




/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const newItem = req.body;
  let user_id = req.user.id;
  console.log(req.user);
  const queryText =`
  INSERT INTO item
  ("description", "image_url", "user_id")
  VALUES
  ($1, $2, $3)
  `
  const queryValues = [
    newItem.description,
    newItem.image_url,
    user_id
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error', err)
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('Req.params: ', req.params.id);

  const sqlQuery = `
    DELETE FROM "item"
    WHERE "id" = $1;
    `;
  pool.query(sqlQuery, [req.params.id])
  .then((response) => {
    console.log('NAILED IT!!!!!', response.body);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error: ', error);
    res.sendStatus(500);
  })


  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  UPDATE "item"
    SET
      "description" = $1,
      "image_url" = $2
    WHERE "id" = $3;
  `;
  const sqlValues = [ req.body.description, req.body.image_url, req.params.id ];
  pool.query(sqlQuery, sqlValues)
  .then(res => {
    res.sendStatus(200);
  }).catch(error => {
    console.error('Error in shelf.router /:id PUT', error);
  });
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
