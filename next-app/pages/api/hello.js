// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


// next js does server side rendering and also provide create an api inside of next proj.
// Thus FE and BE will exist inside of one proj.
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
