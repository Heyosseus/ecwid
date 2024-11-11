import express, { Request, Response } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import * as cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
const PORT = 3000

const ECWID_API_BASE = `https://app.ecwid.com/api/v3/${process.env.ECWID_STORE_ID}/products`

async function getRecentlyUpdatedProducts(limit: number) {
  const url = `${ECWID_API_BASE}?limit=${limit}`
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.ECWID_ACCESS_TOKEN}`
    }
  })
  return response.data.items
}

app.get(
  '/api/recent-products',
  async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5
      const products = await getRecentlyUpdatedProducts(limit)
      res.json(products)
    } catch (error) {
      console.error('Error fetching recent products:', error)
      res.status(500).json({
        error: 'Failed to fetch products'
      })
    }
  }
)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
