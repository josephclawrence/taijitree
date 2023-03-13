const getMetaData = require('metadata-scraper');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // YOLO
    console.log('request URL', req.query?.url);
    try {

        const url = req.query?.url;
        const data = await getMetaData(url)
        console.log(data)
        
        res.status(200).json({
            data
        });
    } catch {
      res.status(500).json({
        error: 'Ooops server error'
      });
    }
}
