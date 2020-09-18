const Pool = require('pg').Pool

var pool

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    user: 'xwlmrkzbcrnoxp',
    host: 'ec2-50-19-231-222.compute-1.amazonaws.com',
    database: 'd970hatls108fr',
    password: 'bd2ca6cf649338bb6c9f2cc482c1d5902785825bc1733682c61107515ce6e072',
    port: 5432,
  })
} else {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shop',
    password: '',
    port: 5432,
  })
}

module.exports = pool

// pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//   if (error) {
//     throw error
//   }
//   response.status(200).json(results.rows)
// })