const headers = new Headers()
headers.append("Content-Type", "application/json")

const body = {
  "test": "event-HKV"
}

const options = {
  method: "POST",
  headers,
  mode: "cors",
  body: JSON.stringify(body),
}

fetch("https://eo3puj8nj3te3xq.m.pipedream.net", options)	
