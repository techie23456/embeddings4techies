//import { pipeline } from "@huggingface/transformers";
import "dotenv/config";
import express from 'express'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/*
import "dotenv/config";

const res = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      content: { parts: [{ text: "hello world" }] },
    }),
  }
);

const data = await res.json();
console.log(data.embedding.values.slice(0, 5));
*/


// const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

// env.backends.onnx.wasm.proxy = false;
// const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
//   device: "wasm",
// });

// const output = await extractor("hello world", { pooling: "mean", normalize: true });
// const embedding = Array.from(output.data);

// console.log(embedding.length);      // 384
// console.log(embedding.slice(0, 5)); // first 5 values
// https://claude.ai/chat/d485270a-7699-4ebf-a3f0-4167d05064af

const app = express()

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.post('/api/submit', async(req,res)=>{

    const resp = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      content: { parts: [{ text: req.body.question }] },
    }),
    }
 );

    const data = await resp.json();
    //console.log(">>>>>>>>>>> ",data)
    const embedding = data.embedding.values;

    console.log("@@@@@@@@@@ ",embedding);

    //res.send({received:embedding})

   
  
    res.send({received:embedding})

})

app.listen(3000,()=>{

    console.log(">>>>>>>Server started at port 3000")

})
