const knex = require("knex");
const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: "./data/lambda.sqlite3"
    }
}

function handleRes(
    res, 
    status, 
    obj
) {
    res.status(status).json(obj);
}

const router = require("express").Router();
const db = knex(knexConfig);

router.get("/", (req, res) => {
    db("zoos")
      .then(zoos => {
		console.log("Here are zoos: ", zoos)
		handleRes(res, 200, zoos)
      })
      .catch(err => handleRes(res, 500, err))
});

router.get("/:id", (req, res) => {
    db("zoos")
        .where({id: req.params.id})
	.first()
	.then(zoo => {
	    if (zoo) {
		handleRes(res, 200, zoo)
	    }
	    if (!zoo) {
		handleRes(res, 404, {message: "Zoo not found"})
	    }
	})
	.catch(err => handleRes(res, 500, err))
});

router.post("/", (req, res) => {
    const {name} = req.body;
    if (!name || typeof name !== "string") {
	handleRes(res, 400, {message: "Must provide a name value"})
    }
    if(typeof name === "string") {
	db("zoos")
	  .insert({name}, "id")
	  .then(ids => {
		const [id] = ids;
		handleRes(res, 201, {id});
	  })
	  .catch(err => handleRes(res, 500, err));
    }
});

module.exports = router;
